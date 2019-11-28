Imports GrapeCity.ActiveReports
Imports System.Globalization
Imports System.IO
Imports System.Threading
Imports System.Data.DataTable

Public Class Service1
    Implements IService1

    Public Sub New()
    End Sub

    Private D_Document As New GrapeCity.ActiveReports.Document.SectionDocument

    Public Function GetData(ByVal value As Integer) As String Implements IService1.GetData
        Return String.Format("You entered: {0}", value)
    End Function
    Public Function GetDataUsingDataContract(ByVal composite As CompositeType) As CompositeType Implements IService1.GetDataUsingDataContract
        If composite Is Nothing Then
            Throw New ArgumentNullException("composite")
        End If
        If composite.BoolValue Then
            composite.StringValue &= "Suffix"
        End If
        Return composite
    End Function
    Private D_DAT As DataSet

    '*********************************************************************************************************
    '*
    '*  処理概要：OUTPUT PDF
    '*
    '*  引数　　：BinhNN - 2016/05/18
    '*
    '*  戻り値　：
    '*
    '*********************************************************************************************************
    Public Function FNC_WEB_PDF( _
       ByVal P1 As String(), _
       ByVal P2 As String(), _
       ByVal P3 As String(), _
       Optional ByVal P4 As String = "", _
       Optional ByVal P5 As String = "" _
   ) As String Implements IService1.FNC_WEB_PDF
        '
        Dim D_RET As Boolean = False         '戻値
        Dim D_PDF As Utl_PDF = Nothing       'PDFクラス
        Dim D_RES As HttpResponse = Nothing  'レスポンス
        Dim D_PTH As String = ""             '作成 PDF のパス
        Dim D_ERR As Boolean = False         'エラーフラグ
        Dim D_ERR_MSG As String = ""         'エラーメッセージ
        Dim D_TMP As String = ""             '一時利用
        Dim I As Integer                     'ループカウンター
        Dim D_UTL_RDB As Utl_RDB = Nothing 'データベースクラス
        '
        Dim D_SQL As String = ""
        Dim D_FLG As Boolean = True
        Dim D_DTP As Integer = 0
        '
        Dim D_DAT As DataSet

        Dim D_EXC_PDF As Export.Pdf.Section.PdfExport = Nothing
        Dim D_File_Name As String = ""

        D_Document = New GrapeCity.ActiveReports.Document.SectionDocument
        Dim D_File_Log As String = ""
        '
        Dim D_RPT As Object
        '
        Dim D_CNT As Integer = 0
        Dim D_Name As String = ""
        '
        Dim D_status As String = "200"
        Dim D_Message As String = String.Empty
        Dim D_Delimete As String = "|#|@"
        Dim D_SourceName As String = String.Empty
        '
        Try
            '
            D_File_Log = ConfigurationManager.AppSettings("FIL_LOG")
            '
            D_PDF = New Utl_PDF()
            D_UTL_RDB = New Utl_RDB()
            '
            For I = 0 To UBound(P1) Step 1
                '帳票選択
                D_RET = False
                D_ERR = False
                '
                D_SQL = P2(I).ToString
                'Trace log                    
                D_DAT = D_UTL_RDB.FNC_GET_DAT(D_SQL)
                '
                If D_DAT.Tables(0).Rows.Count = 0 Then
                    D_status = "203"

                    GoTo EXIT_FUNCTION
                End If
                '
                Select Case P1(I)
                    Case "R010"
                        D_RPT = New R010Report
                        Call SUB_ADD_RPT(D_RPT, D_DAT.Tables(0), D_Document)
                        '
                        D_Document.Printer.PaperKind = System.Drawing.Printing.PaperKind.A4
                        D_Document.Printer.Landscape = True
                    Case "L013"
                        D_RPT = New L013Report
                        Call SUB_ADD_RPT(D_RPT, D_DAT.Tables(0), D_Document)
                        '
                        D_Document.Printer.PaperKind = System.Drawing.Printing.PaperKind.A4
                        D_Document.Printer.Landscape = True
                    Case "L0132"
                        D_RPT = New L0132Report
                        Call SUB_ADD_RPT(D_RPT, D_DAT.Tables(0), D_Document)
                        '
                        D_Document.Printer.PaperKind = System.Drawing.Printing.PaperKind.A4
                        D_Document.Printer.Landscape = True
                    Case "I006"
                        D_RPT = New I006Report
                        Call SUB_ADD_RPT(D_RPT, D_DAT.Tables(0), D_Document)
                        '
                        D_Document.Printer.PaperKind = System.Drawing.Printing.PaperKind.A4
                        D_Document.Printer.Landscape = True
                    Case "I008_PDFFind"
                        D_RPT = New I008Report
                        Call SUB_ADD_RPT(D_RPT, D_DAT.Tables(0), D_Document)
                        '
                        D_Document.Printer.PaperKind = System.Drawing.Printing.PaperKind.A4
                        D_Document.Printer.Landscape = False
                        'Case "I008_PDFFind_section"
                        '    D_RPT = New I008_2Report
                        '    Call SUB_ADD_RPT(D_RPT, D_DAT.Tables(0), D_Document)
                        '    '
                        '    D_Document.Printer.PaperKind = System.Drawing.Printing.PaperKind.A4
                        '    D_Document.Printer.Landscape = False
                    Case Else
                        D_ERR = True
                        D_ERR_MSG = "帳票が選択できませんでした。"
                        Exit For

                End Select
                '
            Next I
            '
            D_EXC_PDF = New Export.Pdf.Section.PdfExport
            '
            D_File_Name = "I006_" & Format(Date.Now, "yyyyMMddHHmmss") & ".pdf"
            'D_File_Name = P3(0) & ".pdf"
            '
            D_PTH = D_PDF.FNC_GET_DIR & D_File_Name
            '
            D_EXC_PDF.Export(D_Document, D_PTH)
            '
            D_TMP = D_PTH.Replace("\", "/")

            If D_TMP.Equals("") Then
                D_PTH = "blank"
            Else
                D_PTH = D_TMP
            End If
        Catch ex As Exception
            Utl_ERR.FNC_ERR_RTN(ex, D_SQL)
            D_status = "201"
        End Try
        '
EXIT_FUNCTION:
        'Trace Log SQL                 
        Utl_ERR.WriteLogFile(D_SQL, D_SourceName, False)
        ' End Trace

        FNC_WEB_PDF = "{" + """" + "status" + """" + ":" + D_status + "," + """" + "filename" + """" + ":" + """" + D_PTH + """," + """" + "message" + """" + ":" + """" + D_Message + """ }"
EXIT_SUB:
    End Function

    '*********************************************************************************************************
    '*
    '*  処理概要：　　　　Fill data file pdf
    '*  
    '*  更新日　：　　　　2015/26/03
    '*  更新者　：　　　　QuynhNT
    '*
    '*********************************************************************************************************
    Public Shared Function SUB_ADD_RPT(ByVal P1 As GrapeCity.ActiveReports.SectionReport, ByVal P2 As System.Data.DataTable, ByRef P3 As GrapeCity.ActiveReports.Document.SectionDocument) As String
        Dim D_RTN As String = ""
        Try
            P1.Document.Printer.PrinterName = ""

            P1.DataSource = P2
            P1.Run()
            P1.Document.PrintOptions.PageScaling = Extensibility.Printing.PageScaling.MultiplePages
            P1.Document.PrintOptions.PagesPerSheet = 1
            '
            P3.Pages.AddRange(P1.Document.Pages)
            '
            D_RTN = "TRUE"
        Catch ex As Exception
            Utl_ERR.FNC_ERR_RTN(ex)
        End Try
SUB_EXIT:
        SUB_ADD_RPT = D_RTN
        Exit Function
    End Function

    '
    ''' <summary>
    ''' Funtion output XLS
    ''' </summary>
    ''' <param name="P_Type"></param>
    ''' <param name="P_SQL"></param>
    ''' <param name="P_Name"></param>
    ''' <param name="P4"></param>
    ''' <param name="P5"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function FNC_WEB_XLS( _
        ByVal P_Type As String(), _
        ByVal P_SQL As String(), _
        ByVal P_Name As String(), _
        ByVal P4 As String, _
        Optional ByVal P5 As String = "" _
    ) As String Implements IService1.FNC_OUT_EXL

        Dim D_File_Log As String = ""
        Dim D_FullName As String = ""
        Dim D_SQL As String = ""
        '
        Try
            D_File_Log = ConfigurationManager.AppSettings("FIL_LOG")

            D_SQL = P_SQL(0).ToString()

            'Log SQL
            Utl_ERR.WriteLogFile(D_SQL, P_Name(0).ToString(), False)
            ''
            Select Case P_Type(0)
                Case "EXAMPLE"
                    Dim objecExecl As New Frm_Example
                    D_FullName = objecExecl.FNC_EXL_EXAMPLE(P_Type, P_SQL, P_Name, P4)
                Case "I008"
                    Dim objecExecl As New Frm_I008
                    D_FullName = objecExecl.FNC_EXL_EXAMPLE(P_Type, P_SQL, P_Name, P4)
                Case "I008_plus"
                    Dim objecExecl As New Frm_I008_plus
                    D_FullName = objecExecl.FNC_EXL_EXAMPLE(P_Type, P_SQL, P_Name, P4)
                Case "L007"
                    Dim objecExecl As New Frm_L007
                    D_FullName = objecExecl.FNC_EXL_EXAMPLE(P_Type, P_SQL, P_Name, P4)
                Case "I008_sheet"
                    Dim objecExecl As New Frm_I008_sheet
                    D_FullName = objecExecl.FNC_EXL_EXAMPLE(P_Type, P_SQL, P_Name, P4)
                Case "I006"
                    Dim objecExecl As New Frm_I006
                    D_FullName = objecExecl.FNC_EXL_I006(P_Type, P_SQL, P_Name, P4)
                Case "I006Page"
                    Dim objecExecl As New Frm_I006Page
                    D_FullName = objecExecl.FNC_EXL_I006_Page(P_Type, P_SQL, P_Name, P4)
                Case "I006Sheet"
                    Dim objecExecl As New Frm_I006Sheet
                    D_FullName = objecExecl.FNC_EXL_I006_Sheet(P_Type, P_SQL, P_Name, P4)
                Case "L013"
                    Dim objecExecl As New Frm_L013
                    D_FullName = objecExecl.FNC_EXL_L013(P_Type, P_SQL, P_Name, P4)
                Case "L013Paginate"
                    Dim objecExecl As New Frm_L013_Paginate
                    D_FullName = objecExecl.FNC_EXL_L013(P_Type, P_SQL, P_Name, P4)
                Case "L013Export5"
                    Dim objecExecl As New Frm_L013_Ex5
                    D_FullName = objecExecl.FNC_EXL_L013(P_Type, P_SQL, P_Name, P4)
                Case "R001"
                    Dim objecExecl As New Frm_R001
                    D_FullName = objecExecl.FNC_EXL_R001(P_Type, P_SQL, P_Name, P4)
                Case "R003"
                    Dim objecExecl As New Frm_R003
                    D_FullName = objecExecl.FNC_EXL_L013(P_Type, P_SQL, P_Name, P4)
                Case Else
            End Select
        Catch ex As Exception
            Utl_ERR.FNC_ERR_RTN(ex)
            ' 
        End Try
EXIT_FUNCTION:
        FNC_WEB_XLS = D_FullName
        Exit Function
    End Function

    '''*********************************************************************************************************
    ''' <summary>
    ''' Function Export CSV
    ''' </summary>
    ''' <param name="P_Type"></param>
    ''' <param name="P_SQL"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    '''*********************************************************************************************************
    Public Function FNC_OUT_CSV( _
       ByVal P_Type As String(), _
        ByVal P_SQL As String(), _
        ByVal P_Name As String(), _
        ByVal P4 As String, _
        Optional ByVal P5 As String = "" _
    ) As String Implements IService1.FNC_OUT_CSV

        Dim D_FullName As String = String.Empty
        '
        Try
            Select Case P_Type(0)
                Case "RL340"
                    D_FullName = Utl_Rpt.FNC_OUP_CSV_CUS(P_SQL:=P_SQL(0), P_Name:=P_Name(0))
                Case "R035"
                    D_FullName = Utl_Rpt.FNC_OUP_CSV_R035(P_SQL:=P_SQL(0), P_Name:=P_Name(0))
                Case "R036"
                    D_FullName = Utl_Rpt.FNC_OUP_CSV_R036(P_SQL:=P_SQL(0), P_Name:=P_Name(0))
                Case Else
                    D_FullName = Utl_Rpt.FNC_OUP_CSV(P_SQL:=P_SQL(0), P_Name:=P_Name(0))
            End Select

        Catch ex As Exception
            Utl_ERR.FNC_ERR_RTN(ex)
            '
        End Try
EXIT_FUNCTION:
        FNC_OUT_CSV = D_FullName
        Exit Function
EXIT_SUB:
    End Function


End Class