// const example = '';
// const example = '';
// const example = '8,0 -> 0,8' //|9,4 -> 3,4|2,2 -> 2,1|7,0 -> 7,4|6,4 -> 2,0|0,9 -> 2,9|3,4 -> 1,4|0,0 -> 8,8|5,5 -> 8,2';
const example = '0,9 -> 5,9|8,0 -> 0,8|9,4 -> 3,4|2,2 -> 2,1|7,0 -> 7,4|6,4 -> 2,0|0,9 -> 2,9|3,4 -> 1,4|0,0 -> 8,8|5,5 -> 8,2';
const input = [
    "223,805 -&gt; 223,548",
    "609,164 -&gt; 609,503",
    "461,552 -&gt; 796,552",
    "207,361 -&gt; 207,34",
    "503,879 -&gt; 503,946",
    "937,52 -&gt; 937,268",
    "560,652 -&gt; 118,652",
    "771,103 -&gt; 85,789",
    "119,156 -&gt; 947,984",
    "356,634 -&gt; 607,634",
    "348,812 -&gt; 873,287",
    "409,490 -&gt; 726,490",
    "298,790 -&gt; 298,454",
    "407,543 -&gt; 820,130",
    "206,89 -&gt; 591,89",
    "164,709 -&gt; 976,709",
    "208,921 -&gt; 208,131",
    "515,209 -&gt; 515,745",
    "876,639 -&gt; 281,44",
    "270,453 -&gt; 727,910",
    "190,417 -&gt; 190,755",
    "522,726 -&gt; 903,726",
    "390,651 -&gt; 603,864",
    "707,549 -&gt; 926,330",
    "471,869 -&gt; 471,561",
    "970,735 -&gt; 401,735",
    "612,624 -&gt; 612,88",
    "844,879 -&gt; 844,453",
    "400,38 -&gt; 400,350",
    "832,225 -&gt; 984,225",
    "971,642 -&gt; 42,642",
    "70,862 -&gt; 447,485",
    "183,79 -&gt; 183,708",
    "598,700 -&gt; 598,287",
    "635,195 -&gt; 39,195",
    "587,362 -&gt; 349,362",
    "108,88 -&gt; 965,945",
    "700,299 -&gt; 165,299",
    "295,824 -&gt; 785,334",
    "211,284 -&gt; 390,105",
    "288,326 -&gt; 672,710",
    "595,231 -&gt; 595,679",
    "671,576 -&gt; 813,718",
    "14,845 -&gt; 784,75",
    "700,129 -&gt; 43,129",
    "83,913 -&gt; 889,107",
    "830,596 -&gt; 322,596",
    "391,450 -&gt; 391,779",
    "384,32 -&gt; 384,430",
    "311,948 -&gt; 938,321",
    "460,288 -&gt; 460,392",
    "924,602 -&gt; 924,595",
    "703,458 -&gt; 703,475",
    "335,953 -&gt; 335,195",
    "692,314 -&gt; 927,314",
    "131,433 -&gt; 131,737",
    "590,771 -&gt; 965,771",
    "650,13 -&gt; 963,13",
    "586,904 -&gt; 658,976",
    "238,824 -&gt; 782,824",
    "366,45 -&gt; 691,370",
    "428,758 -&gt; 201,758",
    "240,545 -&gt; 30,545",
    "396,154 -&gt; 332,154",
    "549,307 -&gt; 233,307",
    "187,240 -&gt; 851,904",
    "151,135 -&gt; 937,921",
    "342,850 -&gt; 342,156",
    "695,200 -&gt; 695,754",
    "385,880 -&gt; 893,372",
    "986,966 -&gt; 813,966",
    "727,661 -&gt; 727,402",
    "316,937 -&gt; 316,797",
    "422,235 -&gt; 422,282",
    "965,684 -&gt; 882,684",
    "266,222 -&gt; 419,69",
    "649,843 -&gt; 635,857",
    "618,84 -&gt; 126,576",
    "588,822 -&gt; 588,636",
    "569,142 -&gt; 569,607",
    "899,479 -&gt; 488,890",
    "986,52 -&gt; 369,52",
    "987,478 -&gt; 551,914",
    "867,951 -&gt; 973,845",
    "90,401 -&gt; 304,401",
    "60,836 -&gt; 798,836",
    "143,675 -&gt; 686,675",
    "743,974 -&gt; 743,305",
    "981,899 -&gt; 551,469",
    "705,430 -&gt; 493,430",
    "301,366 -&gt; 823,366",
    "978,712 -&gt; 617,712",
    "426,805 -&gt; 426,345",
    "532,855 -&gt; 532,54",
    "612,143 -&gt; 612,133",
    "57,52 -&gt; 955,950",
    "880,50 -&gt; 16,914",
    "89,908 -&gt; 89,214",
    "487,867 -&gt; 586,867",
    "181,285 -&gt; 181,470",
    "526,666 -&gt; 86,226",
    "117,704 -&gt; 117,961",
    "289,101 -&gt; 983,795",
    "586,429 -&gt; 442,429",
    "442,869 -&gt; 734,869",
    "564,479 -&gt; 564,382",
    "447,486 -&gt; 62,101",
    "42,218 -&gt; 509,218",
    "21,890 -&gt; 843,68",
    "84,978 -&gt; 921,141",
    "590,960 -&gt; 590,934",
    "54,949 -&gt; 967,36",
    "799,39 -&gt; 767,39",
    "979,232 -&gt; 979,628",
    "489,482 -&gt; 339,482",
    "759,473 -&gt; 290,942",
    "960,958 -&gt; 32,30",
    "134,180 -&gt; 134,864",
    "972,981 -&gt; 13,22",
    "106,385 -&gt; 11,385",
    "849,454 -&gt; 447,454",
    "477,385 -&gt; 955,863",
    "853,180 -&gt; 922,180",
    "509,274 -&gt; 751,32",
    "905,295 -&gt; 779,295",
    "661,629 -&gt; 104,629",
    "935,117 -&gt; 93,959",
    "165,372 -&gt; 746,953",
    "988,141 -&gt; 122,141",
    "625,621 -&gt; 625,406",
    "24,710 -&gt; 465,710",
    "417,468 -&gt; 851,34",
    "365,285 -&gt; 572,285",
    "217,164 -&gt; 217,214",
    "943,439 -&gt; 465,439",
    "80,102 -&gt; 80,717",
    "869,19 -&gt; 54,834",
    "399,480 -&gt; 399,458",
    "644,826 -&gt; 644,911",
    "651,189 -&gt; 651,687",
    "671,946 -&gt; 332,607",
    "531,417 -&gt; 657,417",
    "847,350 -&gt; 847,112",
    "315,733 -&gt; 871,177",
    "749,118 -&gt; 692,118",
    "55,616 -&gt; 55,894",
    "570,307 -&gt; 633,307",
    "12,964 -&gt; 883,93",
    "84,299 -&gt; 84,185",
    "49,187 -&gt; 903,187",
    "592,40 -&gt; 842,40",
    "639,381 -&gt; 802,544",
    "59,61 -&gt; 836,61",
    "968,51 -&gt; 266,753",
    "883,373 -&gt; 883,130",
    "612,45 -&gt; 406,45",
    "206,698 -&gt; 206,823",
    "385,685 -&gt; 385,46",
    "656,338 -&gt; 73,921",
    "256,794 -&gt; 365,903",
    "671,247 -&gt; 248,247",
    "722,509 -&gt; 635,422",
    "460,783 -&gt; 615,783",
    "946,980 -&gt; 946,129",
    "343,780 -&gt; 343,723",
    "218,371 -&gt; 218,856",
    "363,809 -&gt; 143,589",
    "434,739 -&gt; 889,739",
    "75,71 -&gt; 975,971",
    "57,253 -&gt; 582,778",
    "976,237 -&gt; 976,148",
    "386,866 -&gt; 386,544",
    "901,797 -&gt; 901,630",
    "976,706 -&gt; 195,706",
    "264,420 -&gt; 272,428",
    "693,72 -&gt; 693,379",
    "888,832 -&gt; 888,490",
    "363,900 -&gt; 363,350",
    "25,312 -&gt; 25,58",
    "292,307 -&gt; 481,307",
    "715,393 -&gt; 976,132",
    "641,450 -&gt; 96,450",
    "650,38 -&gt; 432,38",
    "339,97 -&gt; 476,97",
    "916,24 -&gt; 13,927",
    "933,934 -&gt; 34,35",
    "971,367 -&gt; 971,919",
    "726,310 -&gt; 477,559",
    "12,984 -&gt; 986,10",
    "318,531 -&gt; 318,72",
    "604,979 -&gt; 12,387",
    "890,39 -&gt; 890,213",
    "944,954 -&gt; 33,43",
    "507,830 -&gt; 284,607",
    "724,111 -&gt; 724,242",
    "425,912 -&gt; 425,445",
    "371,903 -&gt; 371,634",
    "415,314 -&gt; 415,509",
    "884,849 -&gt; 884,454",
    "726,647 -&gt; 447,926",
    "588,463 -&gt; 588,426",
    "807,453 -&gt; 807,593",
    "32,449 -&gt; 975,449",
    "593,757 -&gt; 593,607",
    "521,850 -&gt; 521,139",
    "843,478 -&gt; 843,317",
    "408,834 -&gt; 408,455",
    "65,241 -&gt; 864,241",
    "532,138 -&gt; 613,138",
    "477,239 -&gt; 477,676",
    "92,400 -&gt; 92,935",
    "268,104 -&gt; 300,104",
    "942,20 -&gt; 93,869",
    "294,134 -&gt; 695,134",
    "748,477 -&gt; 748,311",
    "581,879 -&gt; 481,879",
    "292,57 -&gt; 874,639",
    "829,787 -&gt; 944,787",
    "130,780 -&gt; 442,780",
    "754,435 -&gt; 956,435",
    "306,659 -&gt; 306,491",
    "252,612 -&gt; 646,612",
    "846,949 -&gt; 846,924",
    "197,888 -&gt; 145,836",
    "156,790 -&gt; 151,790",
    "903,305 -&gt; 671,73",
    "195,79 -&gt; 195,40",
    "781,67 -&gt; 781,635",
    "742,743 -&gt; 742,280",
    "297,42 -&gt; 618,42",
    "237,151 -&gt; 156,151",
    "851,930 -&gt; 47,126",
    "425,368 -&gt; 659,134",
    "57,890 -&gt; 898,49",
    "86,62 -&gt; 86,445",
    "133,499 -&gt; 133,604",
    "202,567 -&gt; 872,567",
    "749,578 -&gt; 749,804",
    "379,379 -&gt; 147,379",
    "510,474 -&gt; 510,388",
    "184,115 -&gt; 738,115",
    "904,613 -&gt; 550,613",
    "755,649 -&gt; 755,305",
    "461,306 -&gt; 461,547",
    "469,124 -&gt; 542,124",
    "736,218 -&gt; 736,968",
    "307,662 -&gt; 307,188",
    "360,970 -&gt; 58,668",
    "36,267 -&gt; 214,267",
    "980,330 -&gt; 22,330",
    "222,972 -&gt; 222,178",
    "846,774 -&gt; 714,774",
    "798,837 -&gt; 789,837",
    "567,258 -&gt; 567,502",
    "325,582 -&gt; 325,976",
    "138,386 -&gt; 138,691",
    "326,878 -&gt; 326,386",
    "790,276 -&gt; 811,276",
    "517,522 -&gt; 81,86",
    "493,567 -&gt; 406,567",
    "522,370 -&gt; 13,370",
    "31,697 -&gt; 607,121",
    "297,524 -&gt; 297,320",
    "790,681 -&gt; 753,681",
    "90,961 -&gt; 901,150",
    "262,46 -&gt; 262,68",
    "18,26 -&gt; 977,985",
    "782,381 -&gt; 956,381",
    "353,740 -&gt; 353,595",
    "32,448 -&gt; 941,448",
    "405,254 -&gt; 686,254",
    "853,57 -&gt; 297,613",
    "555,209 -&gt; 439,209",
    "765,679 -&gt; 142,56",
    "175,903 -&gt; 175,685",
    "693,653 -&gt; 845,653",
    "394,108 -&gt; 394,901",
    "351,108 -&gt; 335,108",
    "841,83 -&gt; 841,716",
    "525,608 -&gt; 525,496",
    "874,32 -&gt; 874,214",
    "354,760 -&gt; 44,760",
    "249,330 -&gt; 864,945",
    "553,377 -&gt; 553,944",
    "903,374 -&gt; 335,374",
    "387,34 -&gt; 387,86",
    "380,331 -&gt; 380,124",
    "618,520 -&gt; 797,520",
    "718,169 -&gt; 703,169",
    "355,184 -&gt; 851,184",
    "582,570 -&gt; 582,313",
    "312,952 -&gt; 312,460",
    "269,70 -&gt; 269,197",
    "701,907 -&gt; 701,768",
    "645,417 -&gt; 645,548",
    "931,532 -&gt; 367,532",
    "497,361 -&gt; 497,348",
    "563,642 -&gt; 976,642",
    "376,504 -&gt; 376,448",
    "538,945 -&gt; 538,773",
    "594,886 -&gt; 594,281",
    "879,558 -&gt; 192,558",
    "985,68 -&gt; 66,987",
    "599,420 -&gt; 599,41",
    "296,318 -&gt; 296,132",
    "330,619 -&gt; 302,619",
    "245,137 -&gt; 918,810",
    "823,798 -&gt; 556,531",
    "64,201 -&gt; 723,860",
    "955,365 -&gt; 955,829",
    "372,976 -&gt; 255,859",
    "804,962 -&gt; 168,962",
    "200,442 -&gt; 200,97",
    "965,964 -&gt; 870,869",
    "534,158 -&gt; 128,564",
    "380,739 -&gt; 577,542",
    "740,391 -&gt; 740,651",
    "167,177 -&gt; 619,177",
    "215,449 -&gt; 215,330",
    "494,612 -&gt; 19,137",
    "458,634 -&gt; 458,257",
    "884,817 -&gt; 393,326",
    "407,291 -&gt; 19,679",
    "627,173 -&gt; 627,570",
    "53,93 -&gt; 552,592",
    "809,363 -&gt; 119,363",
    "588,418 -&gt; 588,764",
    "807,131 -&gt; 807,834",
    "616,61 -&gt; 514,61",
    "553,642 -&gt; 236,325",
    "959,553 -&gt; 683,553",
    "36,754 -&gt; 36,830",
    "533,293 -&gt; 144,293",
    "950,780 -&gt; 396,780",
    "949,878 -&gt; 14,878",
    "453,180 -&gt; 989,180",
    "22,46 -&gt; 670,694",
    "479,206 -&gt; 479,552",
    "22,53 -&gt; 599,53",
    "254,964 -&gt; 884,334",
    "578,813 -&gt; 100,813",
    "945,247 -&gt; 778,80",
    "312,978 -&gt; 312,518",
    "882,225 -&gt; 882,967",
    "581,683 -&gt; 293,395",
    "107,540 -&gt; 534,967",
    "382,946 -&gt; 28,946",
    "864,743 -&gt; 246,743",
    "538,558 -&gt; 733,753",
    "811,436 -&gt; 814,436",
    "982,33 -&gt; 65,950",
    "785,829 -&gt; 945,829",
    "322,471 -&gt; 346,471",
    "904,528 -&gt; 904,669",
    "231,471 -&gt; 772,471",
    "773,490 -&gt; 669,386",
    "867,482 -&gt; 417,32",
    "352,856 -&gt; 352,478",
    "723,355 -&gt; 619,355",
    "667,922 -&gt; 667,247",
    "642,386 -&gt; 241,386",
    "594,35 -&gt; 594,580",
    "916,723 -&gt; 793,723",
    "73,774 -&gt; 269,970",
    "43,273 -&gt; 148,168",
    "744,637 -&gt; 825,637",
    "98,30 -&gt; 98,383",
    "130,277 -&gt; 802,277",
    "167,122 -&gt; 672,627",
    "871,866 -&gt; 564,559",
    "923,475 -&gt; 539,859",
    "422,714 -&gt; 422,946",
    "667,950 -&gt; 667,640",
    "758,181 -&gt; 12,927",
    "129,927 -&gt; 129,288",
    "485,661 -&gt; 402,661",
    "114,573 -&gt; 974,573",
    "674,779 -&gt; 851,779",
    "977,184 -&gt; 977,143",
    "229,937 -&gt; 229,138",
    "520,887 -&gt; 520,512",
    "918,329 -&gt; 918,990",
    "732,41 -&gt; 521,41",
    "399,245 -&gt; 883,729",
    "824,618 -&gt; 356,618",
    "215,218 -&gt; 845,848",
    "704,34 -&gt; 307,431",
    "124,166 -&gt; 696,738",
    "692,749 -&gt; 839,749",
    "790,637 -&gt; 790,598",
    "697,396 -&gt; 669,396",
    "419,140 -&gt; 113,446",
    "426,738 -&gt; 171,738",
    "489,494 -&gt; 190,793",
    "320,301 -&gt; 320,398",
    "275,809 -&gt; 275,717",
    "537,703 -&gt; 465,703",
    "536,450 -&gt; 560,450",
    "153,927 -&gt; 914,166",
    "246,692 -&gt; 485,453",
    "26,179 -&gt; 26,554",
    "487,678 -&gt; 487,696",
    "807,719 -&gt; 224,719",
    "605,920 -&gt; 899,920",
    "112,262 -&gt; 112,765",
    "752,898 -&gt; 752,429",
    "861,103 -&gt; 861,477",
    "628,505 -&gt; 628,248",
    "556,293 -&gt; 556,276",
    "826,682 -&gt; 273,129",
    "685,324 -&gt; 685,692",
    "544,410 -&gt; 544,678",
    "796,633 -&gt; 796,950",
    "753,843 -&gt; 753,936",
    "817,40 -&gt; 817,600",
    "137,941 -&gt; 677,401",
    "563,457 -&gt; 599,457",
    "251,644 -&gt; 251,67",
    "170,792 -&gt; 805,792",
    "171,486 -&gt; 171,877",
    "337,481 -&gt; 268,412",
    "43,158 -&gt; 44,158",
    "148,610 -&gt; 863,610",
    "332,765 -&gt; 202,765",
    "307,637 -&gt; 334,637",
    "557,380 -&gt; 231,54",
    "858,76 -&gt; 150,784",
    "477,329 -&gt; 319,329",
    "306,608 -&gt; 306,38",
    "245,42 -&gt; 245,929",
    "15,786 -&gt; 745,786",
    "946,321 -&gt; 841,321",
    "837,281 -&gt; 837,762",
    "847,391 -&gt; 847,840",
    "304,52 -&gt; 304,299",
    "938,122 -&gt; 877,122",
    "214,347 -&gt; 862,347",
    "494,540 -&gt; 751,540",
    "184,29 -&gt; 913,758",
    "904,12 -&gt; 15,901",
    "573,23 -&gt; 158,23",
    "926,603 -&gt; 643,603",
    "105,506 -&gt; 518,506",
    "551,917 -&gt; 983,917",
    "708,33 -&gt; 831,33",
    "347,173 -&gt; 218,44",
    "933,175 -&gt; 933,781",
    "902,556 -&gt; 902,812",
    "556,485 -&gt; 252,789",
    "823,807 -&gt; 368,352",
    "217,744 -&gt; 217,470",
    "795,455 -&gt; 795,783",
    "170,944 -&gt; 926,188",
    "55,655 -&gt; 258,655",
    "158,57 -&gt; 959,858",
    "714,823 -&gt; 714,550",
    "238,18 -&gt; 388,18",
    "980,985 -&gt; 12,17",
    "360,596 -&gt; 770,596",
    "846,684 -&gt; 220,58",
    "552,107 -&gt; 552,974",
    "228,552 -&gt; 354,552",
    "421,41 -&gt; 421,103",
    "674,475 -&gt; 912,475",
    "455,626 -&gt; 455,683",
    "952,841 -&gt; 946,841",
    "920,792 -&gt; 381,253",
    "786,918 -&gt; 786,175",
    "889,859 -&gt; 889,24",
    "178,604 -&gt; 573,209",
    "71,621 -&gt; 550,621",
    "38,36 -&gt; 922,920",
    "104,690 -&gt; 575,690",
    "252,883 -&gt; 894,241",
    "627,107 -&gt; 417,107",
    "768,913 -&gt; 13,158",
    "708,337 -&gt; 708,407",
    "156,941 -&gt; 156,297",
    "814,653 -&gt; 814,829",
    "234,920 -&gt; 896,920",
    "652,170 -&gt; 128,170",
    "765,825 -&gt; 347,825",
    "681,901 -&gt; 681,112",
    "410,301 -&gt; 979,301",
    "462,681 -&gt; 462,726",
    "117,957 -&gt; 117,693",
    "479,948 -&gt; 698,948",
    "839,965 -&gt; 97,223",
    "102,189 -&gt; 102,366",
    "93,798 -&gt; 819,72",
    "27,336 -&gt; 27,655",
    "161,635 -&gt; 527,269",
    "140,272 -&gt; 140,336",
    "884,915 -&gt; 41,72",
    "575,563 -&gt; 155,563",
    "387,601 -&gt; 387,597",
    "355,186 -&gt; 782,613",
    "866,435 -&gt; 816,435",
    "96,161 -&gt; 764,161",
    "971,29 -&gt; 21,979"
];
// const regex = /contain/gm;
// const regex2 = /bags|bag/gm;
// const regex3 = /^ | $/gm;


const exampleArray = example.split('\|').map(el=>el.split(' -> ').map(el=>el.split(',').map(Number)));
console.log(exampleArray)
const inputArray = input.map(el=>el.split(' -&gt; ').map(el=>el.split(',').map(Number)));
console.log(inputArray)






export {exampleArray, inputArray};