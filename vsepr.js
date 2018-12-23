class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    translate(xd, yd, zd) {
        this.x += xd;
        this.y += yd;
        this.z += zd;
    }

    translateV(vec) {
        this.translate(vec.x, vec.y, vec.z);
    }

    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    add(x, y, z) {
        return new Vector3(this.x + x, this.y + y, this.z + z);
    }

    addV(vec) {
        return this.add(vec.x, vec.y, vec.z);
    }

    scale(c) {
        this.x *= c;
        this.y *= c;
        this.z *= c;
    }

    length() {
        return Math.hypot(this.x, this.y, this.z);
    }

    unitify() {
        this.scale(1 / this.length());
    }

    cross(x, y, z) {
        let a = this.x, b = this.y, c = this.z;
        return new Vector3(b * z - c * y, c * x - a * z, a * y - b * x);
    }

    crossV(vec) {
        return this.cross(vec.x, vec.y, vec.z);
    }

    dot(x, y, z) {
        return new Vector3(this.x * x, this.y * y, this.z * z);
    }

    dotV(vec) {
        return this.dot(vec.x, vec.y, vec.z);
    }

    mult(c) {
        return this.clone().scale(c);
    }

    static zero() {
        return new Vector3(0, 0, 0);
    }
}

// Credit to https://gist.github.com/gordonbrander/2230317
function genID() {
    return '_' + Math.random().toString(36).substr(2, 14);
}

const ATOM_RES = 40; // Sphere triangle resolution for atoms
const BOND_RES = 30; // Cylinder resolution for bonds
const LP_MAT = new THREE.MeshPhongMaterial({color: 0xdddddd});

const BALL_ATOM_R = 30;
const STICK_R = 15;

class Atom {
    constructor(element) {
        this.element = getElement(element);
        this.pos = Vector3.zero();

        this.material = new THREE.MeshPhongMaterial({color: this.element.color});
        this.geo = new THREE.SphereGeometry(this.element.vdw_r, ATOM_RES, ATOM_RES);
        this.mesh = new THREE.Mesh(this.geo, this.material);
        this.id = this.element.name + genID();
        this.mesh.name = this.id;
        this.vis_state = 0; // 0: space-fill, 1: ball-and-stick, 2: hidden

        this.bonds = [];
        this.lone_pairs = [];
    }

    setVis(vis) {
        if (this.vis_state === vis) return;

        if (vis === 0) { // space-fill
            if (this.vis_state === 1) {
                let scale_f = this.element.vdw_r / BALL_ATOM_R;
                this.geo.scale(scale_f, scale_f, scale_f);
            } else if (this.vis_state === 2) {
                this.mesh.visible = true;
            }
        } else if (vis === 1) { // ball-and-stick
            if (this.vis_state === 0 || this.vis_state === 2) {
                let scale_f = BALL_ATOM_R / this.element.vdw_r;
                this.geo.scale(scale_f, scale_f, scale_f);
            }
            if (this.vis_state === 2) {
                this.mesh.visible = true;
            }
        } else if (vis === 2) { // hidden
            if (this.vis_state === 1) {
                let scale_f = this.element.vdw_r / BALL_ATOM_R;
                this.geo.scale(scale_f, scale_f, scale_f);
            }
            this.mesh.visible = false;
        } else {
            throw new Error("Unknown visualization state.");
        }

        this.vis_state = vis;
        this.bonds.forEach(bond => bond.setVis(vis));
        this.lone_pairs.forEach(pair => pair.setVis(vis));
    }

    addTo(scene) {
        if (!this.scene && scene.getObjectByName(this.id)) {
            return;
        }

        this.scene = scene;
        scene.add(this.mesh);
    }

    remove() {
        this.scene.remove(this.mesh);
        this.scene = undefined;
    }

    updateMeshCoords() {
        let p1 = this.mesh.position, p2 = this.pos;

        p1.x = p2.x;
        p1.y = p2.y;
        p1.z = p2.z;

        this.calculateBonds();
        this.updateLonePairs();
    }

    updateLonePairs() {
        this.lone_pairs.forEach(pair => pair.updateMeshCoords());
    }

    isBonded(atom) {
        return this.bonds.some(bond => bond.p2 === atom) || atom.bonds.some(bond => bond.p1 === this);
    }

    bond(atom, type="-") {
        if (this.isBonded(atom))
            return;

        let bond = new Bond(this, atom, type);

        this.bonds.push(bond);

        this.calculateBonds();

        return bond;
    }

    disconnect(atom) {
        if (!this.isBonded(atom))
            return;

        for (let i = 0; i < this.bonds.length; i++) {
            let bond = this.bonds[i];
            if (bond.p1 === atom || bond.p2 === atom) {
                bond.destroy();
                this.bonds.splice(i);
                return;
            }
        }

        atom.disconnect(this);
    }

    calculateBonds() {
        this.bonds.forEach(bond => bond.calcP2());
    }

    addLonePair() {
        let pair = new LonePair(this);

        this.lone_pairs.push(pair);
    }

    destroy() {
        this.remove();

        this.geo.dispose();
        this.material.dispose();

        this.bonds.forEach(bond => bond.destroy());
        this.lone_pairs.forEach(pair => pair.destroy());
    }

    removeLonePair() {

    }
}

class Bond {
    constructor(p1, p2, type = '-') { // Determine position of p2 based on p1
        this.p1 = p1;
        this.p2 = p2;

        this.r = getBondLength(p1.element.number, p2.element.number, type);
        this.theta = 0;
        this.phi = Math.PI / 2;

        this.p1bmat = new THREE.MeshPhongMaterial({color: p1.element.color});
        this.p2bmat = new THREE.MeshPhongMaterial({color: p2.element.color});
        this.p1bgeo = new THREE.CylinderGeometry(STICK_R, STICK_R, this.r / 2, ATOM_RES);
        this.p2bgeo = new THREE.CylinderGeometry(STICK_R, STICK_R, this.r / 2, ATOM_RES);
        this.p1bmesh = new THREE.Mesh(this.p1bgeo, this.p1bmat);
        this.p2bmesh = new THREE.Mesh(this.p2bgeo, this.p2bmat);

        this.mesh = new THREE.Group();

        this.mesh.add(this.p1bmesh);
        this.mesh.add(this.p2bmesh);
        this.p2bmesh.position.y = 3 * this.r / 4;
        this.p1bmesh.position.y = this.r / 4;

        this.setVis(0);
        this.updateMeshCoords();
    }

    calcP2() {
        this.p2.pos = this.p1.pos.add(this.r * Math.cos(this.theta) * Math.sin(this.phi), this.r * Math.sin(this.theta) * Math.sin(this.phi), this.r * Math.cos(this.phi));
        this.p2.updateMeshCoords();
        this.updateMeshCoords();
    }

    addTo(scene) {
        if (!this.scene && scene.getObjectByName(this.id)) {
            return;
        }

        this.scene = scene;
        scene.add(this.mesh);
    }

    remove() {
        this.scene.remove(this.mesh);
        this.scene = undefined;
    }

    destroy() {
        this.remove();

        [this.p1bmat,
            this.p2bmat,
            this.p1bgeo,
            this.p2bgeo].forEach(object => object.dispose());
    }

    setVis(vis) {
        if (this.vis_state === vis) return;
        if (vis === 0) { // space-fill
            this.mesh.visible = false;
        } else if (vis === 1) { // ball-and-stick
            this.mesh.visible = true;
        } else if (vis === 2) { // hidden
            this.mesh.visible = false;
        } else {
            throw new Error("Unknown visualization state.");
        }
        this.vis_state = vis;
    }

    updateMeshCoords() {
        var quaternion = new THREE.Quaternion();
        let p1 = this.p1.pos;
        let p2 = this.p2.pos;

        quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z).normalize());

        let r = this.mesh.rotation;

        r.x = 0;
        r.y = 0;
        r.z = 0;

        this.mesh.applyQuaternion(quaternion);
        this.mesh.position.set(p1.x, p1.y, p1.z);
    }
}

class LonePair {
    constructor(parent_atom) {
        this.parent = parent_atom;

        this.r = this.parent.element.cov_r;
        this.theta = 0;
        this.phi = 0;

        this.material = LP_MAT;
        this.geo = new THREE.SphereGeometry(10, ATOM_RES, ATOM_RES);
        this.mesh = new THREE.Mesh(this.geo, this.material);

        this.id = "LP" + genID();
        this.mesh.name = this.id;

        this.setVis(0);

        this.updateMeshCoords();
    }

    destroy() {
        this.remove();

        this.geo.dispose();
    }

    get x() {
        return this.parent.pos.x + this.r * Math.cos(this.theta) * Math.sin(this.phi);
    }

    get y() {
        return this.parent.pos.y + this.r * Math.sin(this.theta) * Math.sin(this.phi);
    }

    get z() {
        return this.parent.pos.z + this.r * Math.cos(this.phi);
    }

    setVis(vis) {
        if (this.vis_state === vis) return;
        if (vis === 0) { // space-fill
            this.mesh.visible = false;
        } else if (vis === 1) { // ball-and-stick
            this.mesh.visible = true;
        } else if (vis === 2) { // hidden
            this.mesh.visible = false;
        } else {
            throw new Error("Unknown visualization state.");
        }
        this.vis_state = vis;
    }

    updateMeshCoords() {
        let p = this.mesh.position;
        p.x = this.x; p.y = this.y; p.z = this.z;
    }

    addTo(scene) {
        if (!this.scene && scene.getObjectByName(this.id)) {
            return;
        }

        this.scene = scene;
        scene.add(this.mesh);
    }

    remove() {
        this.scene.remove(this.mesh);
        this.scene = null;
    }
}

var cWidth = 350;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, (window.innerWidth - cWidth) / window.innerHeight, 0.1, 100000);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth - cWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls( camera );

camera.position.set(200, 200, 200);
controls.update();

let directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
scene.add(directionalLight);
let light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

window.addEventListener("resize", () => {
    camera.aspect = (window.innerWidth - cWidth) / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth - cWidth, window.innerHeight);
});

let iodine = new Atom("O");
iodine.addTo(scene);
<<<<<<< HEAD
// let lp = new LonePair(iodine);
// lp.addTo(scene);
let fluorine = new Atom("H");
=======
let lp = new LonePair(iodine);
lp.addTo(scene);
let fluorine = new Atom("F");
>>>>>>> 670add048c1fd979030b5798cac3d5f170b43f83
fluorine.addTo(scene);
fluorine.bond(iodine).addTo(scene);
fluorine.setVis(1);
iodine.setVis(1);

let windowsIsSuperior = new Atom("He");
windowsIsSuperior.addTo(scene);
windowsIsSuperior.bond(fluorine).addTo(scene);
windowsIsSuperior.setVis(1);

function animate() {
    requestAnimationFrame(animate);

    controls.update();
    fluorine.bonds[0].theta += .01;
    fluorine.bonds[0].phi += .01;
    fluorine.updateMeshCoords();

    renderer.render(scene, camera);
}

animate();
