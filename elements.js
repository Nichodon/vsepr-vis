let Elements = [
    {name: "Hydrogen", symbol: "H", number: "1", mass: "1.00794(7)", en: 2.2, ie: 13.59844, cov_r: 38, vdw_r: 120, color: "#ffffff"},
    {name: "Helium", symbol: "He", number: "2", mass: "4.002602(2)", en: NaN, ie: 24.58741, cov_r: 32, vdw_r: 140, color: "#ff933f"},
    {name: "Lithium", symbol: "Li", number: "3", mass: "6.941(2)", en: 0.98, ie: 5.39172, cov_r: 134, vdw_r: 182, color: "#eee9ee"},
    {name: "Beryllium", symbol: "Be", number: "4", mass: "9.012182(3)", en: 1.57, ie: 9.3227, cov_r: 90, vdw_r: NaN, color: "#252527"},
    {name: "Boron", symbol: "B", number: "5", mass: "10.811(7)", en: 2.04, ie: 8.29803, cov_r: 82, vdw_r: NaN, color: "#ffb6b6"},
    {name: "Carbon", symbol: "C", number: "6", mass: "12.0107(8)", en: 2.55, ie: 11.2603, cov_r: 77, vdw_r: 170, color: "#070200"},
    {name: "Nitrogen", symbol: "N", number: "7", mass: "14.0067(2)", en: 3.04, ie: 14.53414, cov_r: 75, vdw_r: 155, color: "#3f3fd9"},
    {name: "Oxygen", symbol: "O", number: "8", mass: "15.9994(3)", en: 3.44, ie: 13.61806, cov_r: 73, vdw_r: 152, color: "#fa2020"},
    {name: "Fluorine", symbol: "F", number: "9", mass: "18.9984032(5)", en: 3.98, ie: 17.42282, cov_r: 71, vdw_r: 147, color: "#e0ef24"},
    {name: "Neon", symbol: "Ne", number: "10", mass: "20.10097(6)", en: NaN, ie: 21.5646, cov_r: 69, vdw_r: 154, color: "#ff443f"},
    {name: "Sodium", symbol: "Na", number: "11", mass: "22.98976928(2)", en: 0.93, ie: 5.13908, cov_r: 154, vdw_r: 227, color: "#ddd9dd"},
    {name: "Magnesium", symbol: "Mg", number: "12", mass: "24.3050(6)", en: 1.31, ie: 7.64624, cov_r: 130, vdw_r: 173, color: "#dddfdd"},
    {name: "Aluminium", symbol: "Al", number: "13", mass: "26.9815386(8)", en: 1.61, ie: 5.98577, cov_r: 118, vdw_r: NaN, color: "#dddfdd"},
    {name: "Silicon", symbol: "Si", number: "14", mass: "28.0855(3)", en: 1.9, ie: 8.15169, cov_r: 111, vdw_r: 210, color: "#cccfef"},
    {name: "Phosphorus", symbol: "P", number: "15", mass: "30.973762(2)", en: 2.19, ie: 10.48669, cov_r: 106, vdw_r: 180, color: "#ff8804"},
    {name: "Sulfur", symbol: "S", number: "16", mass: "32.065(5)", en: 2.58, ie: 10.36001, cov_r: 102, vdw_r: 180, color: "#f2f205"},
    {name: "Chlorine", symbol: "Cl", number: "17", mass: "35.453(2)", en: 3.16, ie: 12.96764, cov_r: 99, vdw_r: 175, color: "#20ed20"},
    {name: "Argon", symbol: "Ar", number: "18", mass: "39.948(1)", en: NaN, ie: 15.75962, cov_r: 97, vdw_r: 188, color: "#fdccfe"},
    {name: "Potassium", symbol: "K", number: "19", mass: "39.0983(1)", en: 0.82, ie: 4.34066, cov_r: 196, vdw_r: 275, color: "#c0c3c0"},
    {name: "Calcium", symbol: "Ca", number: "20", mass: "40.078(4)", en: 1, ie: 6.11316, cov_r: 174, vdw_r: NaN, color: "#c0c5c0"},
    {name: "Scandium", symbol: "Sc", number: "21", mass: "44.955912(6)", en: 1.36, ie: 6.5615, cov_r: 144, vdw_r: NaN, color: "#d0d5c0"},
    {name: "Titanium", symbol: "Ti", number: "22", mass: "47.867(1)", en: 1.54, ie: 6.8281, cov_r: 136, vdw_r: NaN, color: "#ddd9dd"},
    {name: "Vanadium", symbol: "V", number: "23", mass: "50.9415(1)", en: 1.63, ie: 6.7462, cov_r: 125, vdw_r: NaN, color: "#424246"},
    {name: "Chromium", symbol: "Cr", number: "24", mass: "51.9961(6)", en: 1.66, ie: 6.7665, cov_r: 127, vdw_r: NaN, color: "#eee9ee"},
    {name: "Manganese", symbol: "Mn", number: "25", mass: "54.938045(5)", en: 1.55, ie: 7.43402, cov_r: 139, vdw_r: NaN, color: "#999792"},
    {name: "Iron", symbol: "Fe", number: "26", mass: "55.845(2)", en: 1.83, ie: 7.9024, cov_r: 125, vdw_r: NaN, color: "#cccccc"},
    {name: "Cobalt", symbol: "Co", number: "27", mass: "58.933195(5)", en: 1.91, ie: 7.6398, cov_r: 121, vdw_r: 163, color: "#cccccc"},
    {name: "Nickel", symbol: "Ni", number: "28", mass: "58.6934(4)", en: 1.88, ie: 7.881, cov_r: 126, vdw_r: NaN, color: "#bbc0bb"},
    {name: "Copper", symbol: "Cu", number: "29", mass: "63.546(3)", en: 1.9, ie: 7.72638, cov_r: 138, vdw_r: 140, color: "#df9135"},
    {name: "Zinc", symbol: "Zn", number: "30", mass: "65.38(2)", en: 1.65, ie: 9.3942, cov_r: 131, vdw_r: 139, color: "#ddd9dd"},
    {name: "Gallium", symbol: "Ga", number: "31", mass: "69.723(1)", en: 1.81, ie: 5.9993, cov_r: 126, vdw_r: 187, color: "#cccccc"},
    {name: "Germanium", symbol: "Ge", number: "32", mass: "72.64(1)", en: 2.01, ie: 7.8994, cov_r: 122, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Arsenic", symbol: "As", number: "33", mass: "74.92160(2)", en: 2.18, ie: 9.7886, cov_r: 119, vdw_r: 185, color: "#aaaaaa"},
    {name: "Selenium", symbol: "Se", number: "34", mass: "78.96(3)", en: 2.55, ie: 9.75238, cov_r: 116, vdw_r: 190, color: "#f0a305"},
    {name: "Bromine", symbol: "Br", number: "35", mass: "79.904(1)", en: 2.96, ie: 11.81381, cov_r: 114, vdw_r: 185, color: "#ad4040"},
    {name: "Krypton", symbol: "Kr", number: "36", mass: "83.798(2)", en: 3, ie: 13.99961, cov_r: 110, vdw_r: 202, color: "#968796"},
    {name: "Rubidium", symbol: "Rb", number: "37", mass: "85.4678(3)", en: 0.82, ie: 4.17713, cov_r: 211, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Strontium", symbol: "Sr", number: "38", mass: "87.62(1)", en: 0.95, ie: 5.6949, cov_r: 192, vdw_r: NaN, color: "#dede99"},
    {name: "Yttrium", symbol: "Y", number: "39", mass: "88.90585(2)", en: 1.22, ie: 6.2171, cov_r: 162, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Zirconium", symbol: "Zr", number: "40", mass: "91.224(2)", en: 1.33, ie: 6.6339, cov_r: 148, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Niobium", symbol: "Nb", number: "41", mass: "92.90638(2)", en: 1.6, ie: 6.75885, cov_r: 137, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Molybdenum", symbol: "Mo", number: "42", mass: "95.96(2)", en: 2.16, ie: 7.09243, cov_r: 145, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Technetium", symbol: "Tc", number: "43", mass: "[98]", en: 1.9, ie: 7.28, cov_r: 156, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Ruthenium", symbol: "Ru", number: "44", mass: "101.07(2)", en: 2.2, ie: 7.3605, cov_r: 126, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Rhodium", symbol: "Rh", number: "45", mass: "102.90550(2)", en: 2.28, ie: 7.4589, cov_r: 135, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Palladium", symbol: "Pd", number: "46", mass: "106.42(1)", en: 2.2, ie: 8.3369, cov_r: 458, vdw_r: 163, color: "#aaaaaa"},
    {name: "Silver", symbol: "Ag", number: "47", mass: "107.8682(2)", en: 1.93, ie: 7.5762, cov_r: 153, vdw_r: 172, color: "#aaaabb"},
    {name: "Cadmium", symbol: "Cd", number: "48", mass: "112.411(8)", en: 1.69, ie: 8.9938, cov_r: 148, vdw_r: 158, color: "#aaaabb"},
    {name: "Indium", symbol: "In", number: "49", mass: "114.818(3)", en: 1.78, ie: 5.78636, cov_r: 144, vdw_r: 193, color: "#bbbbbb"},
    {name: "Tin", symbol: "Sn", number: "50", mass: "118.710(7)", en: 1.96, ie: 7.3439, cov_r: 141, vdw_r: 217, color: "#aaaabb"},
    {name: "Antimony", symbol: "Sb", number: "51", mass: "121.760(1)", en: 2.05, ie: 8.6084, cov_r: 138, vdw_r: NaN, color: "#aaaabb"},
    {name: "Tellurium", symbol: "Te", number: "52", mass: "127.60(3)", en: 2.1, ie: 9.0096, cov_r: 135, vdw_r: 206, color: "#aaaaaa"},
    {name: "Iodine", symbol: "I", number: "53", mass: "126.90447(3)", en: 2.66, ie: 10.45126, cov_r: 133, vdw_r: 198, color: "#a004a0"},
    {name: "Xenon", symbol: "Xe", number: "54", mass: "131.293(6)", en: 2.6, ie: 12.1298, cov_r: 130, vdw_r: 216, color: "#7090ba"},
    {name: "Caesium", symbol: "Cs", number: "55", mass: "132.9054519(2)", en: 0.79, ie: 3.8939, cov_r: 225, vdw_r: NaN, color: "#c0ab89"},
    {name: "Barium", symbol: "Ba", number: "56", mass: "137.327(7)", en: 0.89, ie: 5.2117, cov_r: 198, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Lanthanum", symbol: "La", number: "57", mass: "138.90547(7)", en: 1.1, ie: 5.5769, cov_r: 169, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Cerium", symbol: "Ce", number: "58", mass: "140.116(1)", en: 1.12, ie: 5.5387, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Praseodymium", symbol: "Pr", number: "59", mass: "140.90765(2)", en: 1.13, ie: 5.473, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Neodymium", symbol: "Nd", number: "60", mass: "144.242(3)", en: 1.14, ie: 5.525, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Promethium", symbol: "Pm", number: "61", mass: "[145]", en: NaN, ie: 5.582, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Samarium", symbol: "Sm", number: "62", mass: "150.36(2)", en: 1.17, ie: 5.6436, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Europium", symbol: "Eu", number: "63", mass: "151.964(1)", en: NaN, ie: 5.6704, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Gadolinium", symbol: "Gd", number: "64", mass: "157.25(3)", en: 1.2, ie: 6.1501, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Terbium", symbol: "Tb", number: "65", mass: "158.92535(2)", en: NaN, ie: 5.8638, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Dysprosium", symbol: "Dy", number: "66", mass: "162.500(1)", en: 1.22, ie: 5.9389, cov_r: NaN, vdw_r: NaN, color: "#999999"},
    {name: "Holmium", symbol: "Ho", number: "67", mass: "164.93032(2)", en: 1.23, ie: 6.0215, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Erbium", symbol: "Er", number: "68", mass: "167.259(3)", en: 1.24, ie: 6.1077, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Thulium", symbol: "Tm", number: "69", mass: "168.93421(2)", en: 1.25, ie: 6.18431, cov_r: NaN, vdw_r: NaN, color: "#999999"},
    {name: "Ytterbium", symbol: "Yb", number: "70", mass: "173.054(5)", en: NaN, ie: 6.25416, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Lutetium", symbol: "Lu", number: "71", mass: "174.9668(1)", en: 1.27, ie: 5.4259, cov_r: 160, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Hafnium", symbol: "Hf", number: "72", mass: "178.49(2)", en: 1.3, ie: 6.82507, cov_r: 150, vdw_r: NaN, color: "#bbbbbb"},
    {name: "Tantalum", symbol: "Ta", number: "73", mass: "180.94788(2)", en: 1.5, ie: 7.5496, cov_r: 138, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Tungsten", symbol: "W", number: "74", mass: "183.84(1)", en: 2.36, ie: 7.864, cov_r: 146, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Rhenium", symbol: "Re", number: "75", mass: "186.207(1)", en: 1.9, ie: 7.8335, cov_r: 159, vdw_r: NaN, color: "#888888"},
    {name: "Osmium", symbol: "Os", number: "76", mass: "190.23(3)", en: 2.2, ie: 8.4382, cov_r: 128, vdw_r: NaN, color: "#9999bb"},
    {name: "Iridium", symbol: "Ir", number: "77", mass: "192.217(3)", en: 2.2, ie: 8.967, cov_r: 137, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Platinum", symbol: "Pt", number: "78", mass: "195.084(9)", en: 2.28, ie: 8.9587, cov_r: 128, vdw_r: 175, color: "#aaaaaa"},
    {name: "Gold", symbol: "Au", number: "79", mass: "196.966569(4)", en: 2.54, ie: 9.2255, cov_r: 144, vdw_r: 166, color: "#ddbb88"},
    {name: "Mercury", symbol: "Hg", number: "80", mass: "200.59(2)", en: 2, ie: 10.4375, cov_r: 149, vdw_r: 155, color: "#aaaaaa"},
    {name: "Thallium", symbol: "Tl", number: "81", mass: "204.3833(2)", en: 1.62, ie: 6.1082, cov_r: 148, vdw_r: 196, color: "#aaaaaa"},
    {name: "Lead", symbol: "Pb", number: "82", mass: "207.2(1)", en: 2.33, ie: 7.41666, cov_r: 147, vdw_r: 202, color: "#aaaaaa"},
    {name: "Bismuth", symbol: "Bi", number: "83", mass: "208.98040(1)", en: 2.02, ie: 7.2856, cov_r: 146, vdw_r: NaN, color: "#777777"},
    {name: "Polonium", symbol: "Po", number: "84", mass: "[209]", en: 2, ie: 8.417, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Astatine", symbol: "At", number: "85", mass: "[210]", en: 2.2, ie: NaN, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Radon", symbol: "Rn", number: "86", mass: "[222]", en: NaN, ie: 10.7485, cov_r: 145, vdw_r: NaN, color: "#aaddaa"},
    {name: "Francium", symbol: "Fr", number: "87", mass: "[223]", en: 0.7, ie: 4.0727, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Radium", symbol: "Ra", number: "88", mass: "[226]", en: 0.9, ie: 5.2784, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Actinium", symbol: "Ac", number: "89", mass: "[227]", en: 1.1, ie: 5.17, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Thorium", symbol: "Th", number: "90", mass: "232.03806(2)", en: 1.3, ie: 6.3067, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Protactinium", symbol: "Pa", number: "91", mass: "231.03588(2)", en: 1.5, ie: 5.89, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Uranium", symbol: "U", number: "92", mass: "238.02891(3)", en: 1.38, ie: 6.19405, cov_r: NaN, vdw_r: 186, color: "#aaaaaa"},
    {name: "Neptunium", symbol: "Np", number: "93", mass: "[237]", en: 1.36, ie: 6.2657, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Plutonium", symbol: "Pu", number: "94", mass: "[244]", en: 1.28, ie: 6.0262, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Americium", symbol: "Am", number: "95", mass: "[243]", en: 1.3, ie: 5.9738, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Curium", symbol: "Cm", number: "96", mass: "[247]", en: 1.3, ie: 5.9915, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Berkelium", symbol: "Bk", number: "97", mass: "[247]", en: 1.3, ie: 6.1979, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Californium", symbol: "Cf", number: "98", mass: "[251]", en: 1.3, ie: 6.2817, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Einsteinium", symbol: "Es", number: "99", mass: "[252]", en: 1.3, ie: 6.42, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Fermium", symbol: "Fm", number: "100", mass: "[257]", en: 1.3, ie: 6.5, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Mendelevium", symbol: "Md", number: "101", mass: "[258]", en: 1.3, ie: 6.58, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Nobelium", symbol: "No", number: "102", mass: "[259]", en: 1.3, ie: 6.65, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Lawrencium", symbol: "Lr", number: "103", mass: "[266]", en: 1.3, ie: 4.9, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Rutherfordium", symbol: "Rf", number: "104", mass: "[267]", en: NaN, ie: 6, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Dubnium", symbol: "Db", number: "105", mass: "[268]", en: NaN, ie: NaN, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Seaborgium", symbol: "Sg", number: "106", mass: "[269]", en: NaN, ie: NaN, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Bohrium", symbol: "Bh", number: "107", mass: "[270]", en: NaN, ie: NaN, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Hassium", symbol: "Hs", number: "108", mass: "[277]", en: NaN, ie: NaN, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Meitnerium", symbol: "Mt", number: "109", mass: "[278]", en: NaN, ie: NaN, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Darmstadtium", symbol: "Ds", number: "110", mass: "[281]", en: NaN, ie: NaN, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Roentgenium", symbol: "Rg", number: "111", mass: "[282]", en: NaN, ie: NaN, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Copernicium", symbol: "Cn", number: "112", mass: "[285]", en: NaN, ie: NaN, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Nihonium", symbol: "Nh", number: "113", mass: "[286]", en: NaN, ie: NaN, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Flerovium", symbol: "Fl", number: "114", mass: "[289]", en: NaN, ie: NaN, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Moscovium", symbol: "Mc", number: "115", mass: "[290]", en: NaN, ie: NaN, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Livermorium", symbol: "Lv", number: "116", mass: "[293]", en: NaN, ie: NaN, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"},
    {name: "Tennessine", symbol: "Ts", number: "117", mass: "[294]", en: NaN, ie: NaN, cov_r: NaN, vdw_r: NaN, color: "#aaaaaa"}
];