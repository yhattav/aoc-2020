
// Copy the input from the AoC website and paste it here
const example = [
    "Valve AA has flow rate=0; tunnels lead to valves DD, II, BB",
    "Valve BB has flow rate=13; tunnels lead to valves CC, AA",
    "Valve CC has flow rate=2; tunnels lead to valves DD, BB",
    "Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE",
    "Valve EE has flow rate=3; tunnels lead to valves FF, DD",
    "Valve FF has flow rate=0; tunnels lead to valves EE, GG",
    "Valve GG has flow rate=0; tunnels lead to valves FF, HH",
    "Valve HH has flow rate=22; tunnel leads to valve GG",
    "Valve II has flow rate=0; tunnels lead to valves AA, JJ",
    "Valve JJ has flow rate=21; tunnel leads to valve II"
];
const input = [
    "Valve OS has flow rate=0; tunnels lead to valves EE, CL",
    "Valve EN has flow rate=0; tunnels lead to valves CL, GV",
    "Valve RR has flow rate=24; tunnels lead to valves FS, YP",
    "Valve VB has flow rate=20; tunnels lead to valves UU, EY, SG, ZB",
    "Valve UU has flow rate=0; tunnels lead to valves OT, VB",
    "Valve WH has flow rate=0; tunnels lead to valves CS, JS",
    "Valve OF has flow rate=25; tunnel leads to valve YM",
    "Valve TY has flow rate=0; tunnels lead to valves AA, GQ",
    "Valve RV has flow rate=0; tunnels lead to valves BT, YX",
    "Valve GK has flow rate=0; tunnels lead to valves GD, AA",
    "Valve EL has flow rate=0; tunnels lead to valves EK, EE",
    "Valve OT has flow rate=9; tunnels lead to valves YR, BJ, OX, UU, HJ",
    "Valve DG has flow rate=11; tunnels lead to valves BN, QE",
    "Valve YR has flow rate=0; tunnels lead to valves OT, YX",
    "Valve GV has flow rate=0; tunnels lead to valves AA, EN",
    "Valve BN has flow rate=0; tunnels lead to valves DG, LU",
    "Valve FS has flow rate=0; tunnels lead to valves TI, RR",
    "Valve DW has flow rate=0; tunnels lead to valves SS, MS",
    "Valve DJ has flow rate=0; tunnels lead to valves KY, GD",
    "Valve BJ has flow rate=0; tunnels lead to valves OT, BT",
    "Valve KY has flow rate=0; tunnels lead to valves EE, DJ",
    "Valve YP has flow rate=0; tunnels lead to valves YM, RR",
    "Valve LU has flow rate=0; tunnels lead to valves BN, CS",
    "Valve OX has flow rate=0; tunnels lead to valves OT, XD",
    "Valve ZB has flow rate=0; tunnels lead to valves VB, PP",
    "Valve CL has flow rate=10; tunnels lead to valves KQ, EN, OS, MQ",
    "Valve XD has flow rate=0; tunnels lead to valves KR, OX",
    "Valve YM has flow rate=0; tunnels lead to valves OF, YP",
    "Valve EY has flow rate=0; tunnels lead to valves MS, VB",
    "Valve KQ has flow rate=0; tunnels lead to valves CS, CL",
    "Valve SS has flow rate=0; tunnels lead to valves AA, DW",
    "Valve SG has flow rate=0; tunnels lead to valves VB, KR",
    "Valve EE has flow rate=22; tunnels lead to valves XR, OS, KY, EL",
    "Valve OI has flow rate=0; tunnels lead to valves RE, MS",
    "Valve QE has flow rate=0; tunnels lead to valves DG, GD",
    "Valve GD has flow rate=3; tunnels lead to valves GK, DJ, MQ, QE, JS",
    "Valve EK has flow rate=23; tunnel leads to valve EL",
    "Valve GQ has flow rate=0; tunnels lead to valves CS, TY",
    "Valve CS has flow rate=7; tunnels lead to valves GQ, WH, KQ, LU",
    "Valve MS has flow rate=4; tunnels lead to valves HJ, EY, DW, OI",
    "Valve XR has flow rate=0; tunnels lead to valves EE, AA",
    "Valve RE has flow rate=6; tunnels lead to valves TI, PP, OI",
    "Valve KR has flow rate=17; tunnels lead to valves XD, SG",
    "Valve BT has flow rate=15; tunnels lead to valves BJ, RV",
    "Valve PP has flow rate=0; tunnels lead to valves RE, ZB",
    "Valve TI has flow rate=0; tunnels lead to valves RE, FS",
    "Valve HJ has flow rate=0; tunnels lead to valves OT, MS",
    "Valve AA has flow rate=0; tunnels lead to valves GK, GV, SS, XR, TY",
    "Valve MQ has flow rate=0; tunnels lead to valves GD, CL",
    "Valve JS has flow rate=0; tunnels lead to valves GD, WH",
    "Valve YX has flow rate=5; tunnels lead to valves YR, RV"
];

const exampleArray = example;
console.log(exampleArray)
const inputArray = input;

export {exampleArray, inputArray};
      
