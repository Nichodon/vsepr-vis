// This is an attempted implementation of the OpenSMILES specification

const organics = 'B C N O S P F Cl Br I *'.split(' ');
const aromatic_organics = 'b c n o s p'.split(' ');

const element_symbols = '* H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Rf Db Sg Bh Hs Mt Ds Rg Cn Fl Lv La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr'.split(' ');
const aromatic_symbols = 'b c n o p s se as'.split(' ');

const instructions = {
    start_branch: "start_branch",
    end_branch: "end_branch",
    start_atom: "start_atom"
};

const BRACKET_ATOM_REGEX = /^([0-9]{0,3})(\*|[a-zA-Z][a-z]?)(@|@@|@TH[0-9]|@AL[0-9]|@TB[0-9]{1,2}|@OH[0-9]{1,2}|)(H[0-9]?|)((?:[-+])[0-9]{0,3}|--|\+\+|)(:[0-9]+|)$/;

function* basic_tokenize(string) {
    // Turns SMILES string into a series of tokens

    let branch_depth = 0;

    for (let i = 0; i < string.length; i++) {
        let char = string[i];

        if (char === ']')
            throw new Error(`Closing atom specification without starting at index ${i}.`);

        if (char === '[') {
            let j;
            for (j = i + 1; j < string.length; j++) {
                let char = string[j];
                if (char === '[') {
                    // Nested square brackets
                    throw new Error(`Can't have nested atom specifications at index ${i}.`);
                } else if (char === ']') {
                    break;
                }
            }

            if (j === i+1)
                throw new Error("Empty bracket atom");


            let descriptor = BRACKET_ATOM_REGEX.exec(string.slice(i + 1, j));

            // [1] is isotope, [2] is element, [3] is chirality, [4] is hydrogen count, [5] is charge, [6] is annotation
            let isotope = descriptor[1];
            let element = descriptor[2];
            let chirality = descriptor[3];
            let h_count = descriptor[4];
            let charge = descriptor[5];
            let annotation = descriptor[6];
            let aromatic = false;

            if (isotope.length !== 0) {
                isotope = parseInt(isotope);
            } else {
                isotope = null;
            }

            if (aromatic_symbols.includes(element)) {
                aromatic = true;
                element = element[0].toUpperCase() + element.slice(1); // capitalize first letter of aromatic Se and As
            } else {
                if (!element_symbols.includes(element)) {
                    throw new Error(`Unknown element ${element} at index ${i}`);
                }
            }

            if (h_count.length === 1) {
                h_count = 1;
            } else if (h_count.length === 0) {
                h_count = null;
            } else {
                h_count = parseInt(h_count.slice(1))
            }

            if (charge === "--") {
                charge = -2;
            } else if (charge === "++") {
                charge = 2;
            } else if (charge.length === 0) {
                charge = 0;
            } else {
                charge = parseInt(charge);
            }

            if (annotation) {
                annotation = annotation.slice(1);
            } else {
                annotation = null;
            }

            yield {type: "atom_descriptor", isotope, element, chirality, h_count, charge, annotation, aromatic, index: i};

            i = j;
        } else {
            if (char === '(') {
                branch_depth++;
                yield {type: "start_branch", index: i};
            } else if (char === ')') {
                branch_depth--;
                if (branch_depth < 0)
                    throw new Error(`Unbalanced parentheses at index ${i}.`);
                yield {type: "end_branch", index: i};
            } else if (char === "-") {
                yield {type: "single_bond", index: i};
            } else if (char === "=") {
                yield {type: "double_bond", index: i};
            } else if (char === "#") {
                yield {type: "triple_bond", index: i};
            } else if (char === "$") {
                yield {type: "quadruple_bond", index: i};
            } else if (char === ":") {
                yield {type: "aromatic_bond", index: i};
            } else if (char === "/") {
                yield {type: "forward_side", index: i};
            } else if (char === "\\") {
                yield {type: "backward_side", index: i};
            } else if (organics.includes(char)) {
                yield {type: "atom", element: char, aromatic: false, index: i};
            } else if ((i + 1 < string.length && organics.includes(char + string[i + 1]))) { // handle Cl, Br
                yield {type: "atom", element: char + string[i + 1], aromatic: false, index: i};
                i++;
            } else if (aromatic_organics.includes(char)) {
                yield {type: "atom", element: char.toUpperCase(), aromatic: true, index: i};
            } else if (char === '%') { // multicharacter ring number
                let ring_number = "";
                do {
                    if (i + 1 < string.length) {
                        let j_char = string[i + 1];
                        if (j_char >= '0' && j_char <= '9') {
                            // character is numeric
                            ring_number += j_char;
                            i++;
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                } while (ring_number.length < 2);
                if (ring_number.length === 0)
                    throw new Error(`Invalid multi-character ring number at index ${i}.`);
                yield {type: "ring_number", value: parseInt(ring_number), index: i};
            } else if (char >= '0' && char <= '9') { // single character ring number
                yield {type: "ring_number", value: parseInt(char), index: i};
            } else if (char === '.') {
                yield {type: "dot_bond", index: i};
            } else {
                throw new Error(`Unknown symbol ${char} at index ${i}.`);
            }
        }
    }
}

const valences = {
    "B": [3],
    "C": [4],
    "N": [3,5],
    "O": [2],
    "P": [3,5],
    "S": [2,4,6],
    "F": [1],
    "Cl": [1],
    "Br": [1],
    "I": [1]
};

class SMILESMolecule {
    constructor(SMILES_string) {
        this.atoms = [];
        this.buildFrom(SMILES_string);
    }

    buildFrom(string) {
        let tokenizer = basic_tokenize(string);
    }
}

let tokenizer = basic_tokenize("C12C3C4C1C5C4C3C25");
while (true) {
    let result = tokenizer.next();
    console.log(result.value);
    if (result.done)
        break;
}

