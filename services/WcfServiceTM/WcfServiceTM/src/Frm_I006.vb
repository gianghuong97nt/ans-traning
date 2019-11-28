Imports System.IO
Imports Microsoft.Office.Interop
Imports System.Globalization
Imports System.Drawing
Imports Microsoft.Office.Interop.Excel

'*********************************************************************************************************
'*
'*  処理概要：Function create Excel
'*  シェア一覧
'*  作成日：	    2019/08/30
'*  作成者：　　 ANS_VIETDT
'*
'*********************************************************************************************************

Public Class Frm_I006


    Public Function FNC_EXL_I006(
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
            D_EXL_TML = ConfigurationManager.AppSettings("FIL_TEM_EXL") & "\i006.xlsx"
            D_File_Log = ConfigurationManager.AppSettings("FIL_LOG")
            '
            D_Name = "I006_" & System.Guid.NewGuid.ToString() & Format(Date.Now, "yyyyMMddHHmmss")
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
            '
            'Title
            For I As Integer = 0 To D_ROW_CNT - 1
                D_EXL_SHT.Cells(6 + I, 1) = I + 1
                D_EXL_SHT.Cells(6 + I, 2) = D_DAT.Tables(0).Rows(I).Item("detail_type_div_name")
                D_EXL_SHT.Cells(6 + I, 3) = D_DAT.Tables(0).Rows(I).Item("order_no")
                D_EXL_SHT.Cells(6 + I, 4) = D_DAT.Tables(0).Rows(I).Item("contents")
                D_EXL_SHT.Cells(6 + I, 6) = D_DAT.Tables(0).Rows(I).Item("order_qty")
                D_EXL_SHT.Cells(6 + I, 7) = D_DAT.Tables(0).Rows(I).Item("order_upr")
                D_EXL_SHT.Cells(6 + I, 8) = D_DAT.Tables(0).Rows(I).Item("order_amt")
                D_EXL_SHT.Cells(6 + I, 9) = D_DAT.Tables(0).Rows(I).Item("sales_amt")
                D_EXL_SHT.Cells(6 + I, 10) = D_DAT.Tables(0).Rows(I).Item("vendor")
                D_EXL_SHT.Cells(6 + I, 11) = D_DAT.Tables(0).Rows(I).Item("vendor_nm")
                D_EXL_SHT.Cells(6 + I, 12) = D_DAT.Tables(0).Rows(I).Item("profit")
                '
                If I < D_ROW_CNT - 1 Then
                    D_EXL_SHT.Rows("6:6").Copy()
                    D_EXL_SHT.Rows(7 + I).Insert()
                    D_EXL_SHT.Rows(7 + I).Select()
                    D_EXL_SHT.Paste()
                End If
                '
            Next
            D_EXL_SHT.Rows(6 + D_ROW_CNT).Delete()

            If D_DAT.Tables(2).Rows(0).Item("mode") = 1 Then
                D_EXL_SHT.Cells(6 + D_ROW_CNT, 6) = D_DAT.Tables(1).Rows(0).Item("sum_order_qty")
                D_EXL_SHT.Cells(6 + D_ROW_CNT, 7) = D_DAT.Tables(1).Rows(0).Item("sum_order_upr")
                D_EXL_SHT.Cells(6 + D_ROW_CNT, 8) = D_DAT.Tables(1).Rows(0).Item("sum_order_amt")
                D_EXL_SHT.Cells(6 + D_ROW_CNT, 9) = D_DAT.Tables(1).Rows(0).Item("sum_sales_amt")
            ElseIf D_DAT.Tables(2).Rows(0).Item("mode") = 2 Then
                Dim sum_order_qty As Integer = 0
                Dim sum_order_upr As Integer = 0
                Dim sum_order_amt As Integer = 0
                Dim sum_sales_amt As Integer = 0
                For I As Integer = 0 To D_ROW_CNT - 1
                    If Not "".Equals(D_DAT.Tables(0).Rows(I).Item("order_qty").ToString) Then
                        sum_order_qty = sum_order_qty + D_DAT.Tables(0).Rows(I).Item("order_qty").Replace(",", "")
                    End If
                    If Not D_DAT.Tables(0).Rows(I).Item("order_upr").ToString.Equals("") Then
                        sum_order_upr = sum_order_upr + D_DAT.Tables(0).Rows(I).Item("order_upr").Replace(",", "")
                    End If
                    If Not "".Equals(D_DAT.Tables(0).Rows(I).Item("order_amt").ToString) Then
                        sum_order_amt = sum_order_amt + D_DAT.Tables(0).Rows(I).Item("order_amt").Replace(",", "")
                    End If
                    If Not "".Equals(D_DAT.Tables(0).Rows(I).Item("sales_amt").ToString) Then
                        sum_sales_amt = sum_sales_amt + D_DAT.Tables(0).Rows(I).Item("sales_amt").Replace(",", "")
                    End If
                Next
                D_EXL_SHT.Cells(6 + D_ROW_CNT, 6) = sum_order_qty
                D_EXL_SHT.Cells(6 + D_ROW_CNT, 7) = sum_order_upr
                D_EXL_SHT.Cells(6 + D_ROW_CNT, 8) = sum_order_amt
                D_EXL_SHT.Cells(6 + D_ROW_CNT, 9) = sum_sales_amt
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
            Utl_ERR.WriteLogReport(ex.ToString(), "I006")
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
        FNC_EXL_I006 = "{" + """" + "status" + """" + ":" + D_status + "," + """" + "filename" + """" + ":" + """" + D_FullName + """" + "}"
        Exit Function

    End Function

End Class
