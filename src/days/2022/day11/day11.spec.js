
    var assert = require('assert');
    var day = require('./day11script.ts')
    var inputs = require('./day11input.ts')
    
    describe('2022-day11', function () {
      describe('part1', function () {
        it('should work on examples', function () {
          assert.equal(
            day.run(inputs.exampleArray),
            1337);
        });
        it('should work on input', function () {
          assert.equal(
            day.run(inputs.inputArray),
            1337);
        });
      });
      describe('part2', function () {
        it('should work on examples', function () {
          assert.equal(
            day.run2(inputs.exampleArray),
            1337);
        });
        it('should work on input', function () {
          assert.equal(
            day.run2(inputs.inputArray),
            1337);
        });
      });
    });
      
