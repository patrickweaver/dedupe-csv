var parse = require('csv-parse');
var fs = require('fs');

var input = fs.readFileSync(process.env.CSV_FILENAME, "utf8");

parse(input, {}, function(err, output){
  if (err) {
    console.log("Error: ");
    console.log(err);
  } else {

    results = [];

    var latIdIndex = 9;
    var longIdIndex = 10;

    for (var m = 0; m < output.length; m++) {
      results.push("");
    }

    for (var i = 0; i < output.length; i++) {
      if (results[i] === "dupe") {
        continue;
      }
      if (output[i][3] === "") {
        results[i] = "blank";
        continue;
      }
      for (var j = 1; j < output.length - i; j++) {

        if (dedupe(output[i], output[i + j])) {
          results[i + j] = "dupe";
        }
      }
    }

    for (var k in results) {
      console.log(k + ": " + results[k]);
    }

    function dedupe(masterRow, candidateRow) {
      if (
        masterRow[latIdIndex].toString().substring(0,7)
        === candidateRow[latIdIndex].toString().substring(0,7)
        && masterRow[longIdIndex].toString().substring(0,8)
        === candidateRow[longIdIndex].toString().substring(0,8)
      ) {
         return true;
      }
    }
  }
});
