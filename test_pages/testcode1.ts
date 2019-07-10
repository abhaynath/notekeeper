"scripts": {
    "test": "jasmine-ts --config=jasmine.json",
        "testWithCoverage": "nyc -r lcov -e .ts -x \"*.test.ts\" jasmine-ts --config=jasmine.json && nyc report"
}