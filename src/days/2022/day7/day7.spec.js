
    var assert = require('assert');
    var day = require('./day7script.ts')
    var inputs = require('./day7Input.ts')
    
    describe('2022-day7', function () {
      describe('part1', function () {
        it('should work on examples', function () {
          assert.equal(
            day.run(inputs.exampleArray),
            95437);
        });
        it('should work on input', function () {
          assert.equal(
            day.run(inputs.inputArray),
            1491614);
        });
      });
      describe('part2', function () {
        it('should work on examples', function () {
          assert.equal(
            day.run2(inputs.exampleArray),
            24933642);
        });
        it('should work on input', function () {
          assert.equal(
            day.run2(inputs.inputArray),
            6400111);
        });
      });
    });
      
