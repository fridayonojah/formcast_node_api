## PDFTron SDK CAD Module

This module supports converting  dwg, dgn, dxf, and rvt(beta) file formats to pdf using the `PDF.Convert.FromCAD` method.

### Installation

This archive should be expanded on top of an existing PDFTron SDK package (version 7.0 or later). This will place the module itself in the correct location, as well as additional test files required to run the CAD conversion sample (located at `Samples/CAD2PDFTest/` in the original download package).

### Usage 

Within your own application logic, call `PDFNet.AddResourceSearchPath()` with the path to the location of `Lib/CAD.module` from this package, if this has been done correctly, then `PDF.CADModule.IsModuleAvailable()` will return true, and `PDF.Convert.FromCAD` will be operational.
