
    var assert = require('assert');
    var day = require('./day3script.ts')
    var inputs = require('./day3input.ts')
    
    describe('2022-day3', function () {
      describe('part1', function () {
        it('should work on examples', function () {
          assert.equal(
            day.run(inputs.exampleArray),
            4361);
        });
        it('should work on input', function () {
          assert.equal(
            day.run(inputs.inputArray),
            539637); 
        });
      });
      describe('part2', function () {
        it('should work on examples', function () {
          assert.equal(
            day.run2(inputs.exampleArray),
            467835);
        });
        it('should work on input', function () {
          assert.equal(
            day.run2(inputs.inputArray),
            82818007);
        });
      });
    });
      
