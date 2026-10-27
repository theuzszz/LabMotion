Option Explicit
Dim inputPath, outputPath, app, doc, toc
If WScript.Arguments.Count <> 2 Then WScript.Quit 2
inputPath = WScript.Arguments(0)
outputPath = WScript.Arguments(1)
On Error Resume Next
Set app = CreateObject("Word.Application")
If Err.Number <> 0 Then
  WScript.Echo "Word: " & Err.Description
  WScript.Quit 3
End If
app.Visible = False
app.DisplayAlerts = 0
app.ScreenUpdating = False
Set doc = app.Documents.Open(inputPath, False, False, False)
If Err.Number <> 0 Then
  WScript.Echo "Abrir: " & Err.Description
  app.Quit
  WScript.Quit 4
End If
doc.Fields.Update
For Each toc In doc.TablesOfContents
  toc.Update
Next
doc.Repaginate
For Each toc In doc.TablesOfContents
  toc.UpdatePageNumbers
Next
doc.Save
Err.Clear
doc.ExportAsFixedFormat outputPath, 17, False, 0, 0, 1, doc.ComputeStatistics(2), 0, True, True, 1, True, True, False
If Err.Number <> 0 Then
  WScript.Echo "Exportar: " & Err.Description
  doc.Close False
  app.Quit
  WScript.Quit 5
End If
WScript.Echo "Paginas: " & doc.ComputeStatistics(2)
doc.Close False
app.Quit
WScript.Echo outputPath
