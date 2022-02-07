
window.onload = function () {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xdddddd));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
    const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x004d00, transparent: false, opacity: 1, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0.0;
    plane.position.y = -1.0;
    plane.position.z = 0.0;
    scene.add(plane);

    function CreateStreets() {
        const StreetGroup = new THREE.Group();
        const Street1Geometry = new THREE.PlaneGeometry(6, 40, 4, 4);
        const Street1Material = new THREE.MeshStandardMaterial({ color: 0x222222, transparent: false, opacity: 1, side: THREE.DoubleSide });
        const Street1 = new THREE.Mesh(Street1Geometry, Street1Material);
        Street1.receiveShadow = true;
        Street1.position.set(0, -0.99, 0);
        Street1.rotation.x = -0.5 * Math.PI;

        const Street2Geometry = new THREE.PlaneGeometry(6, 60, 4, 4);
        const Street2Material = new THREE.MeshStandardMaterial({ color: 0x222222, transparent: false, opacity: 1, side: THREE.DoubleSide });
        const Street2 = new THREE.Mesh(Street2Geometry, Street2Material);
        Street2.receiveShadow = true;
        Street2.position.set(0, -0.98, 0);
        Street2.rotation.z = -0.5 * Math.PI;
        Street2.rotation.x = -0.5 * Math.PI;


        const StreetStripesGeometry = new THREE.PlaneGeometry(0.25, 1, 4, 4);
        const StreetStripesMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: false, opacity: 1, side: THREE.DoubleSide });

        for (let i = -14; i <= 14; i++) {
            const StreetStripe = new THREE.Mesh(StreetStripesGeometry, StreetStripesMaterial);
            StreetStripe.rotation.x = 0.5 * Math.PI;
            StreetStripe.rotation.z = 0.5 * Math.PI;

            StreetStripe.position.set(i * 2, -0.97, 0);
            StreetGroup.add(StreetStripe);
        }

        for (let i = -9; i <= 9; i++) {
            if ((i <= 2) && (i >= -2)) continue;
            const StreetStripeR = new THREE.Mesh(StreetStripesGeometry, StreetStripesMaterial);
            StreetStripeR.rotation.x = 0.5 * Math.PI;
            StreetStripeR.position.set(0, -0.97, i * 2.1);
            StreetGroup.add(StreetStripeR);
        }


        const StreetStripesGeometry2 = new THREE.PlaneGeometry(0.4, 1.8, 4, 4);
        const StreetStripesMaterial2 = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: false, opacity: 1, side: THREE.DoubleSide });

        for (let i = -3; i <= 3; i++) {
            const StreetStripe2 = new THREE.Mesh(StreetStripesGeometry2, StreetStripesMaterial2);
            StreetStripe2.rotation.x = 0.5 * Math.PI;

            StreetStripe2.position.set(i * 0.9, -0.97, 4);
            StreetGroup.add(StreetStripe2);
        }

        for (let i = -3; i <= 3; i++) {
            const StreetStripe3 = new THREE.Mesh(StreetStripesGeometry2, StreetStripesMaterial2);
            StreetStripe3.rotation.x = 0.5 * Math.PI;

            StreetStripe3.position.set(i * 0.9, -0.97, -4);
            StreetGroup.add(StreetStripe3);
        }
        StreetGroup.add(Street1, Street2)
        StreetGroup.add(Street1, Street2);
        return StreetGroup;
    }
    const Streets = CreateStreets();
    scene.add(Streets);
    const Blokgeometry = new THREE.BoxGeometry(3, 8, 3);
    const Blokmaterial = new THREE.MeshLambertMaterial({ color: 0x808080, transparent: false });

    const Dachgeometry = new THREE.ConeGeometry(3, 2, 4);
    const Dachmaterial = new THREE.MeshLambertMaterial({ color: 0x804000, transparent: false });

    const Wingeometry = new THREE.PlaneGeometry(0.7, 0.7);
    const Winmaterial = new THREE.MeshLambertMaterial({ color: 0x3333ff, side: THREE.DoubleSide, transparent: false });

    function CreateBlok() {
        const group = new THREE.Group();

        const Blok = new THREE.Mesh(Blokgeometry, Blokmaterial);
        Blok.receiveShadow = true;
        Blok.castShadow = true;

        const Dach = new THREE.Mesh(Dachgeometry, Dachmaterial);
        Dach.castShadow = true;
        Dach.recieveShadow = true;
        Dach.position.setY(Blokgeometry.parameters.height / 2 + Dachgeometry.parameters.height / 2)
        Dach.rotation.y = 0.25 * Math.PI;

        for (let j = 1; j <= 2; j++) {
            for (let i = 1; i <= 4; i++) {
                // console.log('Okno ', i + 1, ': ', Dachgeometry.parameters.height / 4 * i)
                const win = CreateWindow();
                win.position.setZ(Blokgeometry.parameters.width / 2 + 0.01);
                win.position.setY(.9 * Blokgeometry.parameters.height / 4 * i - Blokgeometry.parameters.height / 2);
                win.position.setX(.6 * Blokgeometry.parameters.width / 2 * j - Blokgeometry.parameters.width / 2);
                group.add(win);
            }
        }

        group.position.setY(Blokgeometry.parameters.height / 2 - 1)
        group.add(Blok, Dach);

        return group;
    }

    function CreateWindow() {
        return new THREE.Mesh(Wingeometry, Winmaterial);
    }


    for (let i = 1; i <= 5; i++) {
        const testBlok = CreateBlok()
        testBlok.rotateY(Math.PI);
        testBlok.position.set(5.5 * i, testBlok.position.y, 18);
        scene.add(testBlok);

    }

    const PathBlokGeometry = new THREE.PlaneGeometry(1, 28, 4, 4);
    const PathBlokMaterial = new THREE.MeshLambertMaterial({ color: 0x3d3d29, transparent: false, opacity: 1, side: THREE.DoubleSide });
    const PathBlok = new THREE.Mesh(PathBlokGeometry, PathBlokMaterial);
    PathBlok.receiveShadow = true;

    PathBlok.rotation.z = -0.5 * Math.PI;
    PathBlok.rotation.x = -0.5 * Math.PI;
    PathBlok.position.x = 16.0;
    PathBlok.position.y = -0.997;
    PathBlok.position.z = 10.0;

    scene.add(PathBlok);

    const PathStreetGeo = new THREE.PlaneGeometry(1, 60.0, 4, 4);
    const PathStreetMat = new THREE.MeshLambertMaterial({ color: 0x3d3d29, transparent: false, opacity: 1, side: THREE.DoubleSide });
    const PathStreet = new THREE.Mesh(PathStreetGeo, PathStreetMat);
    PathStreet.receiveShadow = true;

    PathStreet.rotation.z = -0.5 * Math.PI;
    PathStreet.rotation.x = -0.5 * Math.PI;
    PathStreet.position.x = 0.0;
    PathStreet.position.y = -0.997;
    PathStreet.position.z = 3.5;

    scene.add(PathStreet);

    const PathStreet2 = new THREE.Mesh(PathStreetGeo, PathStreetMat);
    PathStreet2.receiveShadow = true;

    PathStreet2.rotation.z = -0.5 * Math.PI;
    PathStreet2.rotation.x = -0.5 * Math.PI;
    PathStreet2.position.x = 0.0;
    PathStreet2.position.y = -0.997;
    PathStreet2.position.z = -3.5;

    scene.add(PathStreet2);

    const PathStreetGeo34 = new THREE.PlaneGeometry(1, 40.0, 4, 4);
    const PathStreetMat34 = new THREE.MeshLambertMaterial({ color: 0x3d3d29, transparent: false, opacity: 1, side: THREE.DoubleSide });

    const PathStreet3 = new THREE.Mesh(PathStreetGeo34, PathStreetMat34);
    PathStreet3.receiveShadow = true;

    PathStreet3.rotation.x = -0.5 * Math.PI;
    PathStreet3.position.x = 3.5;
    PathStreet3.position.y = -0.997;
    PathStreet3.position.z = 0;

    scene.add(PathStreet3);

    const PathStreet4 = new THREE.Mesh(PathStreetGeo34, PathStreetMat34);
    PathStreet4.receiveShadow = true;

    PathStreet4.rotation.x = -0.5 * Math.PI;
    PathStreet4.position.x = -3.5;
    PathStreet4.position.y = -0.997;
    PathStreet4.position.z = 0;

    scene.add(PathStreet4);

    const Housegeometry = new THREE.BoxGeometry(3, 2, 3);
    const Housematerial = new THREE.MeshLambertMaterial({ color: 0xffaa00, transparent: false });
    const Doorgeometry = new THREE.PlaneGeometry(0.7, 1.3);
    const Doormaterial = new THREE.MeshLambertMaterial({ color: 0x804000, side: THREE.DoubleSide, transparent: false });

    function CreateParking() {
        const ParkingGroup = new THREE.Group();
        const ParkingGeometry = new THREE.PlaneGeometry(9, 16, 1, 1);
        const ParkingMaterial = new THREE.MeshStandardMaterial({ color: 0x111109, transparent: false, opacity: 1, side: THREE.DoubleSide });
        const Parking = new THREE.Mesh(ParkingGeometry, ParkingMaterial);
        Parking.receiveShadow = true;

        Parking.rotation.x = -0.5 * Math.PI;
        Parking.position.x = -24.5;
        Parking.position.y = -0.97;
        Parking.position.z = -12;

        ParkingGroup.add(Parking);

        const ParkingStripesGeometry = new THREE.PlaneGeometry(0.15, 2.2, 4, 4);
        const ParkingStripesMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: false, opacity: 1, side: THREE.DoubleSide });
        const ParkingStripesGeometry2 = new THREE.PlaneGeometry(0.15, 0.3, 4, 4);

        for (let i = -13; i <= -3; i++) {
            const ParkingStripes = new THREE.Mesh(ParkingStripesGeometry, ParkingStripesMaterial);
            const ParkingStripes2 = new THREE.Mesh(ParkingStripesGeometry2, ParkingStripesMaterial);
            ParkingStripes2.rotation.x = 0.5 * Math.PI;
            ParkingStripes.rotation.x = 0.5 * Math.PI;
            ParkingStripes.rotation.z = 0.5 * Math.PI;
            ParkingStripes.position.set(-27.9, -0.96, i * 1.5);
            ParkingStripes2.position.set(-26.8, -0.96, i * 1.5);
            ParkingGroup.add(ParkingStripes, ParkingStripes2);
        }

        for (let i = -13; i <= -3; i++) {
            const ParkingStripes = new THREE.Mesh(ParkingStripesGeometry, ParkingStripesMaterial);
            const ParkingStripes2 = new THREE.Mesh(ParkingStripesGeometry2, ParkingStripesMaterial);
            ParkingStripes2.rotation.x = 0.5 * Math.PI;
            ParkingStripes.rotation.x = 0.5 * Math.PI;
            ParkingStripes.rotation.z = 0.5 * Math.PI;
            ParkingStripes.position.set(-21.1, -0.96, i * 1.5);
            ParkingStripes2.position.set(-22.2, -0.96, i * 1.5);
            ParkingGroup.add(ParkingStripes, ParkingStripes2);
        }



        return ParkingGroup;
    }

    const Parking = CreateParking();
    scene.add(Parking);


    function createWheels() {
        const geometry = new THREE.CylinderGeometry(0.2, 0.2, 1.2, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x111111, transparent: false });
        const wheel = new THREE.Mesh(geometry, material);
        wheel.rotation.x = 0.5 * Math.PI;
        return wheel;
    }

    function createCar(x, y, z, c) {
        const car = new THREE.Group();

        const backWheel = createWheels();
        backWheel.position.y = 0.2;
        backWheel.position.x = -0.5;
        car.add(backWheel);

        const frontWheel = createWheels();
        frontWheel.position.y = 0.2;
        frontWheel.position.x = 0.5;
        car.add(frontWheel);

        if (c == 1) {
            const main = new THREE.Mesh(
                new THREE.BoxBufferGeometry(1.5, 0.4, 1),
                new THREE.MeshLambertMaterial({ color: 0xff0000, transparent: false })
            );
            main.position.y = 0.3;
            car.add(main);
        }
        else if (c == 2) {
            const main = new THREE.Mesh(
                new THREE.BoxBufferGeometry(1.5, 0.4, 1),
                new THREE.MeshLambertMaterial({ color: 0xff00ff, transparent: false })
            );
            main.position.y = 0.3;
            car.add(main);
        }
        else if (c == 3) {
            const main = new THREE.Mesh(
                new THREE.BoxBufferGeometry(1.5, 0.4, 1),
                new THREE.MeshLambertMaterial({ color: 0x145214, transparent: false })
            );
            main.position.y = 0.3;
            car.add(main);
        }


        const cabin = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 0.4, 0.7),
            new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: false })
        );
        cabin.position.x = -0.25;
        cabin.position.y = 0.7;
        car.add(cabin);
        car.position.set(x, y, z);
        return car;
    }

    for (let i = -12.5; i <= -3; i++) {
        c = Math.floor(Math.random() * 3 + 1);
        if (i % 1.5 == 0) {
            const car = createCar(-28.1, -0.99, i * 1.5, c);
            scene.add(car);
        }

    }

    for (let i = -12.5; i <= -4; i++) {
        c = Math.floor(Math.random() * 3 + 1);
        if ((i >= -9) && (i <= -2)) {
            const car = createCar(-21.1, -0.99, i * 1.5, c);
            scene.add(car);
        }

    }

    function CreateSigns(x, z) {
        const SignGroup = new THREE.Group();
        const Sign1geometry = new THREE.CylinderGeometry(0.05, 0.05, 1.2, 30);
        const Sign1material = new THREE.MeshLambertMaterial({ color: 0xb3b3b3, transparent: false });
        const Sign1 = new THREE.Mesh(Sign1geometry, Sign1material);
        Sign1.receiveShadow = true;
        Sign1.castShadow = true;
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.1);
        const material = new THREE.MeshLambertMaterial({ color: 0xcccc00, transparent: false });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.setY(Sign1geometry.parameters.height * 0.7);
        SignGroup.add(Sign1, cube);
        SignGroup.position.set(x, -0.5, z);
        return SignGroup;
    }

    const TestSign = CreateSigns(-3.2, 3.2);
    scene.add(TestSign);

    const TestSign2 = CreateSigns(3.2, -3.2);
    scene.add(TestSign2);


    function CreateHouses() {
        const HouseGroup = new THREE.Group();
        const House = new THREE.Mesh(Housegeometry, Housematerial);
        House.castShadow = true;
        House.receiveShadow = true;
        const Door = new THREE.Mesh(Doorgeometry, Doormaterial);
        Door.position.setZ(Housegeometry.parameters.width / 2 + 0.01);
        Door.position.setX(0);
        Door.position.setY(-0.35);
        const Dach = new THREE.Mesh(Dachgeometry, Dachmaterial);
        Dach.castShadow = true;
        Dach.recieveShadow = true;
        Dach.position.setY(Housegeometry.parameters.height / 2 + Dachgeometry.parameters.height / 2)
        Dach.rotation.y = 0.25 * Math.PI;

        const win = CreateWindow();
        win.position.setZ(Housegeometry.parameters.width / 2 + 0.01);
        win.position.setX(-0.6 * Housegeometry.parameters.width / 2);
        const win2 = CreateWindow();
        win2.position.setZ(Housegeometry.parameters.width / 2 + 0.01);
        win2.position.setX(0.6 * Housegeometry.parameters.width / 2);
        HouseGroup.add(House, Door, Dach, win, win2);

        return HouseGroup;
    }
    for (let i = 1; i <= 5; i++) {
        const testHouse = CreateHouses();
        testHouse.rotateY(Math.PI);
        testHouse.position.set(-5.5 * i, testHouse.position.y, 18);
        scene.add(testHouse);
    }

    const PathGeometry = new THREE.PlaneGeometry(1, 13, 4, 4);
    const PathMaterial = new THREE.MeshLambertMaterial({ color: 0x3d3d29, transparent: false, opacity: 1, side: THREE.DoubleSide });

    function CreatePath(d, x, z, r) {
        const PathGeometry = new THREE.PlaneGeometry(1, d, 4, 4);
        const PathMaterial = new THREE.MeshStandardMaterial({ color: 0x3d3d29, transparent: false, opacity: 1, side: THREE.DoubleSide });
        const Path = new THREE.Mesh(PathGeometry, PathMaterial);
        Path.receiveShadow = true;
        Path.position.y = -0.99;
        Path.rotation.x = -0.5 * Math.PI;
        Path.rotation.z = r * Math.PI;
        Path.position.x = x;
        Path.position.z = z;

        return Path;
    }

    for (let i = 1; i <= 5; i++) {
        const testPath = CreatePath(14, -5.5 * i, 10, 1);
        scene.add(testPath);
    }

    for (let i = 1; i <= 5; i++) {
        const testPath = CreatePath(7, 5.5 * i, 14, 1);
        scene.add(testPath);
    }

    function CreateTree(x, z) {

        const TreeGroup = new THREE.Group();
        const Treegeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 30);
        const Treematerial = new THREE.MeshLambertMaterial({ color: 0x804000, transparent: false });
        const Tree = new THREE.Mesh(Treegeometry, Treematerial);
        Tree.receiveShadow = true;
        Tree.castShadow = true;

        Tree.position.x = x;
        Tree.position.y = -0.5;
        Tree.position.z = z;

        const Tree1geometry = new THREE.TetrahedronGeometry(1, 2);
        const Tree1material = new THREE.MeshLambertMaterial({ color: 0x004d00, transparent: false });
        const Tree1 = new THREE.Mesh(Tree1geometry, Tree1material);
        Tree1.castShadow = true;
        Tree1.recieveShadow = true;

        Tree1.position.x = x;
        Tree1.position.y = 0.5;
        Tree1.position.z = z;

        TreeGroup.add(Tree, Tree1);


        return TreeGroup;
    }

    function CreateFence() {
        const FenceGroup = new THREE.Group();
        const FenceGeometry = new THREE.BoxGeometry(0.1, 0.8, 0.25);
        const FenceMaterial = new THREE.MeshLambertMaterial({ color: 0x996633, transparent: false, opacity: 1, side: THREE.DoubleSide });

        for (let i = 6; i <= 18; i++) {
            const Fence = new THREE.Mesh(FenceGeometry, FenceMaterial);
            Fence.rotation.y = 0.5 * Math.PI;

            Fence.castShadow = true;
            Fence.recieveShadow = true;
            Fence.position.set(-8.25, -0.97, i);
            FenceGroup.add(Fence);

        }

        const Fence2Geometry = new THREE.BoxGeometry(12, 0.1, 0.1);
        const Fence2 = new THREE.Mesh(Fence2Geometry, FenceMaterial);
        Fence2.position.set(-8.25, -0.7, 12);
        Fence2.rotation.y = 0.5 * Math.PI;

        FenceGroup.add(Fence2);


        return FenceGroup;
    }


    const TestFence = CreateFence();
    scene.add(TestFence);
    const TestFence2 = CreateFence();
    scene.add(TestFence2);
    TestFence2.position.setX(-5.5);
    const TestFence3 = CreateFence();
    scene.add(TestFence3);
    TestFence3.position.setX(-10.5);
    const TestFence4 = CreateFence();
    scene.add(TestFence4);
    TestFence4.position.setX(-16.0);
    const TestFence5 = CreateFence();
    scene.add(TestFence5);
    TestFence5.position.setX(-21.5);


    for (let i = 2; i <= 10; i++) {
        if (i % 2 == 0) {
            const TestTree = CreateTree(8 * i * 0.3, 8);
            scene.add(TestTree);
        }
        else {
            const TestTree = CreateTree(8 * i * 0.4, 5);
            scene.add(TestTree);
        }
    }


    const ParkPath = CreatePath(15, -11, -12, -0.5);
    scene.add(ParkPath);
    const ParkPath2 = CreatePath(16, -11, -12, 1);
    scene.add(ParkPath2);
    const ParkPath3 = CreatePath(16, -18, -12, 1);
    scene.add(ParkPath3);


    function CreateBin(x, z) {
        const BinGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.5, 5, 5, true);
        const BinMaterial = new THREE.MeshLambertMaterial({ color: 0x293d3d, transparent: false });
        const Bin = new THREE.Mesh(BinGeometry, BinMaterial);
        Bin.position.x = x;
        Bin.position.z = z;
        Bin.position.y = -0.8;
        const BinGroup = new THREE.Group();
        const BinRoofgeometry = new THREE.ConeGeometry(0.2, 0.15, 8);
        const BinRoofmaterial = new THREE.MeshLambertMaterial({ color: 0x293d3e, transparent: false });
        const BinRoof = new THREE.Mesh(BinRoofgeometry, BinRoofmaterial);
        BinRoof.position.x = x;
        BinRoof.position.z = z;
        BinRoof.position.y = -0.5;
        BinGroup.add(BinRoof, Bin);

        return BinGroup;
    }


    function CreateChimney(x, z) {
        const chimneygeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.5, 5, 5, true);
        const chimneymaterial = new THREE.MeshLambertMaterial({ color: 0x000000, transparent: false });
        const chimney = new THREE.Mesh(chimneygeometry, chimneymaterial);
        chimney.recieveShadow = true;
        chimney.castShadow = true;
        chimney.position.x = x;
        chimney.position.z = z;
        chimney.position.y = -0.8;

        const ChimneyGroup = new THREE.Group();
        const ChimneyRoofgeometry = new THREE.ConeGeometry(0.4, 0.2, 8);
        const ChimneyRoofmaterial = new THREE.MeshLambertMaterial({ color: 0x000000, transparent: false });
        const ChimneyRoof = new THREE.Mesh(ChimneyRoofgeometry, ChimneyRoofmaterial);
        ChimneyRoof.recieveShadow = true;
        ChimneyRoof.castShadow = true;
        ChimneyRoof.position.x = x;
        ChimneyRoof.position.z = z;
        ChimneyRoof.position.y = -0.45;
        ChimneyGroup.add(ChimneyRoof, chimney);

        return ChimneyGroup;
    }

    const Bin1 = CreateBin(3.2, 3.2);
    scene.add(Bin1);

    const Bin2 = CreateBin(3.5, -3.2);
    scene.add(Bin2);

    const Bin3 = CreateBin(-3.2, 3.5);
    scene.add(Bin3);

    const Bin4 = CreateBin(-3.2, -3.2);
    scene.add(Bin4);


    for (let i = -29; i <= -9; i += 10) {
        const TestBin = CreateBin(i, 3.2)
        scene.add(TestBin);
        const TestBin2 = CreateBin(i, -3.2)
        scene.add(TestBin2)

    }
    for (let i = 29; i >= 9; i -= 10) {
        const TestBin = CreateBin(i, 3.2)
        scene.add(TestBin);
        const TestBin2 = CreateBin(i, -3.2)
        scene.add(TestBin2)

    }

    function CreateBench(x, z, r) {
        const Benchgeometry = new THREE.BoxGeometry(0.9, 0.3, 0.3);
        const Benchmaterial = new THREE.MeshLambertMaterial({ color: 0x804000, transparent: false });
        const Bench = new THREE.Mesh(Benchgeometry, Benchmaterial);
        Bench.position.x = x;
        Bench.position.z = z;
        Bench.position.y = -0.8;
        Bench.rotation.y = r * Math.PI;
        return Bench;
    }

    const Bench1 = CreateBench(-11.5, -7, -0.5);
    scene.add(Bench1);
    const Bench2 = CreateBench(-11.5, -17, -0.5);
    scene.add(Bench2);
    const Bench3 = CreateBench(-18.5, -7, -0.5);
    scene.add(Bench3);
    const Bench4 = CreateBench(-18.5, -17, -0.5);
    scene.add(Bench4);


    for (let i = -5; i >= -20; i -= 4) {
        const ParkTree = CreateTree(i, -10.5);
        scene.add(ParkTree);
        const ParkTree2 = CreateTree(i, -13.5);
        scene.add(ParkTree2);
    }

    function CreateBigBlock() {
        const BlokBiggeometry = new THREE.BoxGeometry(22, 10, 13);
        const BlokBigmaterial = new THREE.MeshLambertMaterial({ color: 0x808080, transparent: false });
        const BlokBig = new THREE.Mesh(BlokBiggeometry, BlokBigmaterial);
        BlokBig.receiveShadow = false;
        BlokBig.castShadow = true;
        BlokBig.position.set(17, 4, -12);

        for (let j = 3.5; j <= 6.5; j++) {
            for (let i = 1; i <= 4; i++) {
                const win = CreateWindow();
                win.position.setZ(-5.49);
                win.position.setY(1.2 * BlokBiggeometry.parameters.height / 4 * i - BlokBiggeometry.parameters.height / 2);
                win.position.setX(.5 * BlokBiggeometry.parameters.width / 2 * j - BlokBiggeometry.parameters.width / 2);
                scene.add(win);
            }
        }

        for (let j = -3.5; j >= -6.5; j--) {
            for (let i = -6; i >= -12; i--) {
                const win2 = CreateWindow();
                win2.position.setZ(i * 1.4);
                win2.position.setY(i * -0.5);
                win2.position.setX(5.99);
                win2.rotation.y = 0.5 * Math.PI;
                scene.add(win2);
            }
        }
        return BlokBig;
    }

    const TestBlokBig = CreateBigBlock();
    scene.add(TestBlokBig);

    for (let i = 7; i <= 27; i += 4) {
        const TestChimney = CreateChimney(i, -8);
        TestChimney.position.y = 10;
        scene.add(TestChimney);
        const TestChimney2 = CreateChimney(i, -16);
        TestChimney2.position.y = 10;
        scene.add(TestChimney2);
    }


    const lanternGeometry = [
    new THREE.CylinderGeometry(2, 5, 20, 32),
    new THREE.CylinderGeometry(1.5, 1.5, 100, 32),
    new THREE.BoxGeometry(7.5, 2, 12.5),
    new THREE.BoxGeometry(4, 1, 9)
    ]

   
    const lanternMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x95a5a6 }),
    new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: .9, transparent: true })
    ]

    
    const lanternElements = [
    new THREE.Mesh(lanternGeometry[0], lanternMaterials[0]),
    new THREE.Mesh(lanternGeometry[1], lanternMaterials[0]),
    new THREE.Mesh(lanternGeometry[2], lanternMaterials[0]),
    new THREE.Mesh(lanternGeometry[3], lanternMaterials[1])
    ]

   
    lanternElements[0].position.set(0, 1, 0)
    lanternElements[1].position.set(0, 45, 0)
    lanternElements[2].position.set(0, 96, -5)
    lanternElements[3].position.set(0, 95, -6)

    
    lanternElements[2].rotateX(Math.PI / 10)
    lanternElements[3].rotateX(Math.PI / 10)

 
    lanternElements.forEach(e => {
        e.castShadow = true
        e.receiveShadow = true
    });

 
    const lanternLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 4, 1, 1);
 


    lanternLight.castShadow = true;

 
    const lanternSingle = new THREE.Group()
    lanternSingle.add(lanternElements[0], lanternElements[1], lanternElements[2], lanternElements[3]);

   
    lanternSingle.scale.set(.035, .035, .035)

    
    const lantern0 = lanternSingle.clone()
    const lantern1 = lanternSingle.clone()
    const lantern2 = lanternSingle.clone()

  
    const lanternLight0 = lanternLight.clone()
    const lanternLight1 = lanternLight.clone()
    const lanternLight2 = lanternLight.clone()


    lantern0.position.set(5, -0.7, 4)
    lantern1.position.set(10, -0.7, 4)
    lantern2.position.set(15, -0.7, 4)



    lanternLight0.position.set(5, 2.5, 3.8);
    lanternLight1.position.set(10, 2.5, 3.8);
     lanternLight2.position.set(15, 2.5, 3.8);

    lanternLight0.target.position.set(5, 1, 1.5);
    lanternLight1.target.position.set(10, 1, 1.5);
    lanternLight2.target.position.set(15, 1, 1.5);

    scene.add( lantern0,lantern1,lantern2,lanternLight0,lanternLight1, lanternLight2,lanternLight0.target, lanternLight1.target,lanternLight2.target)

    camera.position.x = -20.0;
    camera.position.y = 25.0;
    camera.position.z = 20.0;
    camera.lookAt(new THREE.Vector3(5.0, 0.0, 0.0));
    controls.update();


    const ambientLight = new THREE.AmbientLight(0x494949);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xfcb92e);
    spotLight.angle = 1;
    spotLight.position.set(5, 10, -20);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array([

    ]);

    const btn1 = document.getElementById('btn1')
    const btn2 = document.getElementById('btn2')
    const btn3 = document.getElementById('btn3')

    btn1.addEventListener('click', () => {
        
        camera.position.x = -20
        camera.position.y = 25
        camera.position.z = 20
        controls.enabled = true;
        controls.update();
    })
    btn2.addEventListener('click', () => {
        camera.position.x = -27
        camera.position.y = 0
        camera.position.z = -6
        controls.enabled = false;
    })
    btn3.addEventListener('click', () => {
        camera.position.x = 11;
        camera.position.y = 0;
        camera.position.z = 13;
        controls.enabled = false;
    })


    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.computeBoundingSphere();

    const materials = [
        new THREE.MeshLambertMaterial({ opacity: 1, color: 0x44ff44, transparent: false }),
        new THREE.MeshLambertMaterial({ color: 0x00ff00, wireframe: true })
    ];

    const mesh = new THREE.Group(geometry, materials);
    materials.forEach(function (e) {
        mesh.add(new THREE.Mesh(geometry, e));
    });
    mesh.children.forEach(function (e) {
        e.castShadow = true;
    });

    scene.add(mesh);


    function animate() {

        spotLight.position.x = 50 * Math.sin(Date.now() / 2400);
        spotLight.position.y = 35 * Math.cos(Date.now() / 2400);
        renderer.render(scene, camera);
        if (spotLight.position.y<0) 
        {
            lanternLight0.intensity = .9;
            lanternLight1.intensity = .9; 
            lanternLight2.intensity = .9;  
            spotLight.intensity = 0; 
        }
        
        if(spotLight.position.y>0)
        {
            lanternLight0.intensity = 0;
            lanternLight1.intensity = 0; 
            lanternLight2.intensity = 0; 
            spotLight.intensity=1;
        }

        requestAnimationFrame(animate);

        mesh.children.forEach(function (e) {
            e.geometry.vertices = vertices;
            e.geometry.verticesNeedUpdate = true;
            e.geometry.computeVertexNormals();
        });

        controls.update();

        renderer.render(scene, camera);
    }

    animate();

   
    window.addEventListener(
        'resize',
        function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera);
        },
        false
    );

}
