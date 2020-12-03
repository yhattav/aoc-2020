const example = '..##.......,#...#...#..,.#....#..#.,..#.#...#.#,.#...##..#.,..#.##.....,.#.#.#....#,.#........#,#.##...#...,#...##....#,.#..#...#.#';
const input = '.#.#....##.......#..........#..,...#...........##...#..#.......,#.####......##.#...#......#.#..,##.....#.#.#..#.#............#.,##.....#....#.........#...##...,###..#.....#....#..............,..........#..#.#..#.#....#.....,##.....#....#.#...#.##.........,#...#......#....##....#..#.#...,.##.##...#....##..#.#.....#...#,.....#.#..........##.#........#,.##..................#..#..##.#,#.#..........##....#.####......,.#......#.#......#.........#...,#....#..##.##..##........#.#...,##..#.##..#...#..####.#..#.....,###....#.###.##...........##..#,.....#.##.....##.#..#####....##,....#.###....#..##....##...#...,..###.#...##.....#.##..#..#.#..,#...#..#..#.........#..#.......,##..#.#.....#.#.#.......#...#.#,...#...##.#........#...#.......,..#..#.#..#...#...#...........#,........#.....#......#...##....,#........##.##.#.#...#...#.....,####.......#.##.###.#....#.....,...#...........#...#......#...#,##...#...#............#.......#,....#...........##.......#.....,###......#.....#....#...#.#...#,.....##..........#.......#.#...,##.##.##...#......#....#.......,##..#.#..#......#...#..#.......,....#....##.##............####.,..#.###..#.##.###..#.##.......#,#.##..#.#.....#..#.....##......,..##..#.....##.#.##........#...,.#..#.#......#..#............#.,.....#..#.#...#....#.##.#......,.#...##.#..#.#...##...##..##...,###............#.#..#..#...#...,..#..##.####.#.....#.....##.###,#....#.##..##....#..#...#.##.#.,.....#.##.........##...##......,.........####.#....#.#......#.#,.........#.#..#...#.#..#.#....#,.#.....#..##.##..##....#.......,..........##......#.##.###....#,.##...###..##.#...#........##..,..............#.#....#.#.###.##,..##.##.......#.#......##...#..,.#.....#..##..#.###...#..#.##.#,#.....#.#..#...#........#...#..,.#......#....#.#.....###...#..#,..##.#....#..##......#.....#...,..#.#.##..#.....#.####..###....,.........#......#..#...........,..#........#.##.#.....##.##..#.,.......#.........#....#...#.#..,.##.....#.#....#.#.......#.....,..........#.##........##...##..,###..###.#.#..#..#####.##.#.##.,..##..##.#.#...#..#.#.#......#.,#..#..#..#..##..#.....#......#.,..#....#.##..#......##.........,..#.##......#...##.#......#....,.......#..#.##.#.....#.........,.......#.#.#.###...##......#...,.....#.#..........#..#...#.....,....##..........#..........##..,..#......#.....#.##.#..#...#.#.,....#.....#..#...#..#.#.##..###,.####....#........#...#........,...##.#.##.#..#...##...#.##....,....#...#...#.#.#.#...#..#.....,.....#...#.#.....#.#........##.,..#.#.......###.#.....##.......,......#.........##....#....#..#,.............##.....##.........,.........##...##.......#.....#.,##.........#..........#.###..##,...#.....#......#....#..##.....,##..#...#...##.#.....#.#......#,..#...##.#.......#.#......#.##.,......#.......#.#...........#..,..........#.....##............#,#........#...#..#.......###.##.,.##...........#.#........#.#.#.,...#..##...#.#....#####.#......,.....##...###...#..#.##...####.,...#....#.....#..#.......#.....,#....#....#...#..#..#.######..#,#.###...........#......#...#..#,.#.#.#.#..#....#....#...##.#...,.#..#.........#.#....###...#...,......#..##.##..........#....##,.....#......##....##.....#...#.,.#...#.#.#....##....#..#....#.#,..................#..###.#..##.,..#.........#......#....#..###.,#.#.....#..#..#....###..###....,..##..##.#..##........##...##..,##..#........##..###..#.....#.#,..#..###..#......#....#...#...#,#..#.#..............##.#..#.#..,.....####....#...####.....#.#..,.....#....##.#......###........,##.##...#.#.#.#.......#....##..,.#......#...#.#....#..##.#.##.#,#.#.##.#.#......#..##........##,...##.....#.....#...#..###...#.,........###.....#.....#...##..#,.....#.##.##......#.#....#...#.,.#....##.......#..#.####.......,.#..#....#..........#......#.#.,.#.##.##.....###.#.#...........,.........#......#..##..........,....#...##.#.#.#..#.#.........#,..#.....#.##...#..#..#.###....#,...#.##......#.....##....#.....,###............#.#....#...#....,.......#.....#..#.#.#....#..#.#,...#......#.#..##..#....#...#.#,............##........##..##...,..#..#.##..#......###..#.......,........#.........#............,..#...#.#########.#...##..###..,#....#......#.......#.#.....#..,#.#..#....###.###....#...#.#...,#...###.#.#.......#.##......#..,.................#...#.#.#.....,##....#...#........#....#.#..#.,......#.....#...#..........#.#.,##..........#...#..........#.##,..#.#.##.#....#.#......#...##..,.....#.......#..#.....#........,#.##.#..##..#.......##.........,....#......#..#..#.#...#.......,...#....#................###...,.##.....#.#....#.#..........##.,...#..#....#.##.##......#......,..#.#....#.......#.#..##.......,....#.....#..........##.#.#####,#.....................##..#..#.,.###..#.##.......##.#...#..#...,...###.......#..#...#......#..#,#..#...#.#..#.#..#..#.##.......,#...##.......#..#..#.##..###...,......#....#.#.#........#.##..#,..##..#....#....#..#.#..#......,..##.#...#.#######..#...#.....#,..#....#..#.........#..##......,...#....#.#......#..#..#.#.....,#..#....#........#.#..##....###,#....#..##......##.##.....#.###,...#.#..........#..#.#.#.#.##..,......##..#.#..#.#....#....#...,##....#....#..#..#.##......#...,....#.#..##.#.#...###....##.#..,...#.......##..#.......#...#...,......##.......#..##.....#...#.,...#.#...#...........#...#.....,.#....#...#......##.##..###..#.,.#..........#...#...#...##.##..,.....###..#.....#..##....#.####,..#.###..#..##..##.....#.#.....,.............#.###...##.#.....#,....###.......###.#.....#..#.#.,........##.#.........#.....###.,.....###.#..#.....#...#..#.....,.#....#..##.#..#.#....#.......#,........#......#.#..#.#..#...##,...#.##.##......#..............,.#.....##.#.....#..#......##...,#..#..#.....#.....#.....###....,.##...........#..#.##.....#....,..#.#......#.#...#.##.#..#...##,...#..........#.....#..........,#.#.#.#.#...#....#...#.....##..,#......##...#...#..........#.#.,....##........#.#..............,#..#.#.#..#........##......#.##,........####...##.#.....#......,....#........#.#..#..##..#.#...,.#.....#..###...#..#.....#..#..,#......###.#..#....#..#.#......,....#.....##.##..#...#.#..##.#.,..##..#...#.#......#....#...#.#,#..##...##..#...###...#..#.....,.......#.....#...........##....,#..##....#........#....##..#.#.,.#........#..##...###.#..#.....,.#.#....#..##...#...##.#..###..,#.........#.......#.....#.#....,#..#.....#.#.###.#..#......#...,....#..#.#....#..##..###....###,###.##.#.#..#...........#.#.#..,..##.#.......#......#..##....#.,.....#.#.#.......##.......#...#,...........#.##....##.##....#.#,...#.......#..#.##..#......#..#,#.#.#...#......##.#...........#,##........#...........###.#..#.,..........#.#.#....#.#..##.#.#.,...#.#.#....#..........#..#....,#.#....###.#.#..#.......###...#,.#....#......#.#.#..#..#.......,......##.............#....#.#.#,.#..........#.........#.##.....,##....#....##....#..#.......#..,#.##.##.#..#..#.....#..#.##.#..,.#..#.......##..#.....##.##....,.......#..........#.#.##..#.##.,....#.....#.#...##....##.......,.......#.........#...##....##.#,#.....#......#..........#...#..,...#.#.......#.#..#....###..#..,.....#.#.#.........#...........,.#..###.#.#........#.#.........,.........#..#......##...##....#,...###..#.....##.....#.###....#,.##...#...#........###.#..#....,.##........#..#.###.######.##.#,##.#...#.#....#..##.#....##....,.......##.....##.#..###.#......,..##...##........#.......#....#,#..##...#.####...###......#...#,.##.....#.##.#.#.....###.#..##.,..###....#.#.###.#....#........,....#..###..#...#....#..#..#.#.,#.#.##....##...##.......#......,.........#...#....#..#.........,.............#...#..##.#.......,...#.##.......#...#.#..##.##...,.####.#.##..#.#......#.##...#.#,.#..#.#.....#.................#,..#.##..###....#...#......####.,..##..##...........#....#...#..,....#...#...#...#.......#....#.,#.#...###...#...#.#...#....##.#,......#...#.#.......#.....#...#,....##...#.#.#....#....#.#....#,.....#.....#...##..#...#....##.,#.....#....#......##.##....#...,...#.#....#...#....#.#....##..#,...#.#..#...##....###..#.......,...##......###...###.#...#..#..,##.......#.......###.......#..#,..##.##..###.#............#...#,#.....##..#..##....##..#.......,......#.#...#......#.....#.....,#...........#....#..##.##.#....,.......#..#......#...#....#...#,.#...##...........#......#...#.,#........#....##...###.#....#..,.....#.......##.........#.##...,.#.###..#....#..##.#..#.#..#...,#.......#.##.#.#....#.#..#....#,###.....#.#.......#..#......#.#,#..#.#.......#.#..##..##.#.#...,#..#.#.#.###........#.....#...#,#.#.#..#..##.....#...........#.,..#.#..#.....#...#...#...##....,...#.##......#...##.#...#.#.#.#,#..#.#.#.#.......####..........,..#......#.#......##.###.....##,..#...##..#.........##....#.##.,##.##.##.#.#.....#..........##.,.#.....###.#..#....#..#.###...#,#...##.......###....#.#..#.....,..#....##.........##.........##,......#....#.##.......#........,..#.#.#..#...#...#...##.#...#..,......#..##.#.#.#...##...#.#.##,#..#...##.#.....#...#.##.......,..#..#.........##.#...#.##...##,##.##.#....#.......#.##..#.....,.....##...##.##...##.........##,#......#...#.......#...#...#...,...##...........#...#..#.......,.#.##.#..#........#....#.......,#.#...#..#......##...#.#.##....,##........####..#.#...#.#.##.##,#..#.#.##......##.#.#..#.......,.....#.........#..#.####....#..,......##..#....#...#.#....#....,#...##........#.........#.....#,.#.#...#.#.#..#............##.#,.#..#....#....#.....#...#.....#,..###...#..#.....#.##.###...#.#,.#.###..#..#...#.#...#.#......#,#...#####......###........##...,.....#.....#..#.#....#..##.....,....##...#.#.##.#####...#....#.,.#.#.........##.#.......#..##..,.#...#.#...#...#....#.#...##.#.,.##...#..#.#..#......#.#.#..##.,..#.....#..#.....##.....#......,..#........#..##...#.......###.,.#....#.......#....#....#..#...,....#......#.#.#.........#.....,..##...#.#.#...#.#........#....,.#.....####...##.#..#...##.....,...#.....#...#...#....#....#...,.........#..#.#.....#..#.#..#..,.........##...........#.......#,......#..#.....##...#.##.#.....,.#......##........##...#.#.##..,.....#.#..##...........#..#..#.,...#.......#...#.#..#.##..#.##.,...#.......#.....#.#...#.##.#..,#.....#.............##.#..####.,.#...#......#...##.#....#.#....,.##..##.##....#.#.....#.......#,...#...#....#....##.#..#....##.,..............##....#.......#.#,.#.#.#...##..#..#...###.#..#...,.#.#...#.#..#.#..#...######..#.,........#......#.#..#.#....#...,..###.....###.#.##....#...##...,.##.#.....#.......##.......#...,..#..##...#..........#.#....#.#';
const regex = /./gm;

const exampleArray = example.split(',');
const inputArray = input.split(',');

export {exampleArray, inputArray};