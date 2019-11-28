Imports System.IO
Imports Microsoft.Office.Interop
Imports System.Globalization
Imports System.Drawing
Imports Microsoft.Office.Interop.Excel

'*********************************************************************************************************
'*
'*  処理概要：Function create Excel
'*  シェア一覧
'*  作成日：	    2017/11/23
'*  作成者：　　 ANS_BinhNN
'*
'*********************************************************************************************************

Public Class Frm_I008

    Public Function FNC_EXL_EXAMPLE(
        ByVal P_Type As String(),
        ByVal P_SQL As String(),
        ByVal P_Name As String(),
        ByVal P4 As String
    ) As String
        '
        Const D_FON As String = "MS Gothic"
        '
        Dim D_DAT As DataSet = Nothing

        Dim D_PDF As Utl_PDF = Nothing
        Dim D_UTL_RDB As Utl_RDB = Nothing

        Dim D_Return As Boolean = False
        '
        Dim D_FullName As String = String.Empty
        Dim D_File_Name As String = String.Empty
        Dim D_EXL_TML As String = String.Empty
        Dim D_ROW_CNT As Integer = 0
        Dim D_ROW_CNT_SUM As Integer = 0
        Dim sum_sales_vb As Integer = 0
        Dim sum_gross_vb As Integer = 0
        Dim D_Name As String = String.Empty
        Dim D_status As String = "200"
        '
        Dim D_App As Excel.Application = Nothing
        Dim D_EXL_BOK As Excel.Workbook = Nothing
        Dim D_EXL_SHT As Excel.Worksheet = Nothing
        '
        Dim D_File_Log As String = ""
        '---------- ↓プロセス関連↓ ----------
        'チェックプロセス日時開始
        Dim D_CheckProcessTimeFrom As Date
        'チェックプロセス日時終了
        Dim D_CheckProcessTimeTo As Date
        '---------- ↑プロセス関連↑ ----------
        Try
            '
            D_UTL_RDB = New Utl_RDB()
            D_PDF = New Utl_PDF()
            '
            Dim D_SQL As String = P_SQL(0).ToString
            '
            D_DAT = New DataSet
            D_DAT = D_UTL_RDB.FNC_GET_DAT(D_SQL)
            '
            If D_DAT.Tables(0).Rows.Count = 0 Then
                '
                D_status = "203"
                GoTo EXIT_FUNCTION
            End If
            '
            D_EXL_TML = ConfigurationManager.AppSettings("FIL_TEM_EXL") & "\I008.xlsx"
            D_File_Log = ConfigurationManager.AppSettings("FIL_LOG")
            '
            D_Name = "I008_" & System.Guid.NewGuid.ToString() & Format(Date.Now, "yyyyMMddHHmmss")
            '
            D_File_Name = D_Name & ".xlsx"
            '
            D_FullName = D_PDF.FNC_GET_DIR & D_File_Name
            '
            FileCopy(D_EXL_TML, D_FullName)
            '
            'チェックプロセス日時開始を設定
            D_CheckProcessTimeFrom = Now
            '
            D_App = New Excel.Application
            'チェックプロセス日時終了を設定
            D_CheckProcessTimeTo = Now
            '
            D_App.DisplayAlerts = False
            '
            D_EXL_BOK = D_App.Workbooks.Open(D_FullName)
            D_EXL_SHT = D_EXL_BOK.Sheets(1)
            '
            D_EXL_SHT.Cells.Font.Name = D_FON
            D_ROW_CNT = D_DAT.Tables(0).Rows.Count
            D_ROW_CNT_SUM = D_DAT.Tables(1).Rows.Count
            '
            'Title

            For I As Integer = 0 To D_ROW_CNT - 1
                D_EXL_SHT.Cells(6 + I, 2) = D_DAT.Tables(0).Rows(I).Item("month")
                D_EXL_SHT.Cells(6 + I, 3) = D_DAT.Tables(0).Rows(I).Item("sales_estimate_amt")
                D_EXL_SHT.Cells(6 + I, 4) = D_DAT.Tables(0).Rows(I).Item("gross_estimate_amt")
                D_EXL_SHT.Cells(6 + I, 5) = D_DAT.Tables(0).Rows(I).Item("percent")
                '
                If I < D_ROW_CNT - 1 Then
                    D_EXL_SHT.Rows("6:6").Copy()
                    D_EXL_SHT.Rows(7 + I).Insert()
                    D_EXL_SHT.Rows(7 + I).Select()
                    D_EXL_SHT.Paste()
                End If
                If Not "".Equals(D_DAT.Tables(0).Rows(I).Item("sales_estimate_amt").ToString) Then
                    sum_sales_vb = sum_sales_vb + D_DAT.Tables(0).Rows(I).Item("sales_estimate_amt").Replace(",", "")
                End If
                If Not "".Equals(D_DAT.Tables(0).Rows(I).Item("gross_estimate_amt").ToString) Then
                    sum_gross_vb = sum_gross_vb + D_DAT.Tables(0).Rows(I).Item("gross_estimate_amt").Replace(",", "")
                End If
                '
            Next

            'SQL'
            If D_DAT.Tables(2).Rows(0).Item("status") = 1 Then
                D_EXL_SHT.Cells(6 + D_ROW_CNT, 3) = D_DAT.Tables(1).Rows(0).Item("sum_sales")
                D_EXL_SHT.Cells(6 + D_ROW_CNT, 4) = D_DAT.Tables(1).Rows(0).Item("sum_gross")
            End If
            'VB'
            If D_DAT.Tables(2).Rows(0).Item("status") = 2 Then
                D_EXL_SHT.Cells(6 + D_ROW_CNT, 3) = sum_sales_vb
                D_EXL_SHT.Cells(6 + D_ROW_CNT, 4) = sum_gross_vb
            End If
            'Excel'
            If D_DAT.Tables(2).Rows(0).Item("status") = 3 Then
                D_EXL_SHT.Cells(D_ROW_CNT + 6, 3).Formula = "=SUM(C" & 6 & ":C" & (D_ROW_CNT + 5) & ")"
                D_EXL_SHT.Cells(D_ROW_CNT + 6, 4).Formula = "=SUM(D" & 6 & ":D" & (D_ROW_CNT + 5) & ")"
            End If
ACTIVE:
            '
            D_EXL_SHT.Cells(1, 1).Activate()

            'Save file
            If Not D_App Is Nothing Then
                D_EXL_BOK.SaveAs(D_FullName)
                D_EXL_BOK.Activate()
            End If
            D_Return = True
            '
        Catch ex As Exception
            Utl_ERR.WriteLogReport(ex.ToString(), "EXAMPLE")
            D_status = "201"

        Finally
            D_DAT.Clear()
            '
            Utl_Rpt.FNC_ReleaseCOMObject(D_EXL_SHT)
            If Not D_EXL_BOK Is Nothing Then
                D_EXL_BOK.Close()
                Utl_Rpt.FNC_ReleaseCOMObject(D_EXL_BOK)
            End If
            If Not D_App Is Nothing Then
                D_App.Quit()
                Utl_Rpt.FNC_ReleaseCOMObject(D_App)
            End If
            '
            Utl_Com.M_KillProcess("EXCEL", D_CheckProcessTimeFrom, D_CheckProcessTimeTo)

        End Try
EXIT_FUNCTION:
        FNC_EXL_EXAMPLE = "{" + """" + "status" + """" + ":" + D_status + "," + """" + "filename" + """" + ":" + """" + D_FullName + """" + "}"
        Exit Function

    End Function

End Class
