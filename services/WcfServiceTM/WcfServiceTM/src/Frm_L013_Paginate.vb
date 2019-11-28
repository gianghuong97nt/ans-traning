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

Public Class Frm_L013_Paginate

    Public Function FNC_EXL_L013(
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
        Dim D_PROJECT_CNT As Integer = 0
        Dim D_Name As String = String.Empty
        Dim D_status As String = "200"
        '
        Dim D_App As Excel.Application = Nothing
        Dim D_EXL_BOK As Excel.Workbook = Nothing
        Dim D_EXL_SHT As Excel.Worksheet = Nothing
        Dim PRO_COUNT As Integer
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
            D_EXL_TML = ConfigurationManager.AppSettings("FIL_TEM_EXL") & "\l013.xlsx"
            D_File_Log = ConfigurationManager.AppSettings("FIL_LOG")
            '
            D_Name = "L013_" & System.Guid.NewGuid.ToString() & Format(Date.Now, "yyyyMMddHHmmss")
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
            D_PROJECT_CNT = D_DAT.Tables(1).Rows.Count
            'Dong fill thuc te
            Dim D_ROW As Integer = 0
            Dim count1 As Integer = 0
            Dim D_WHERE As String = ""
            Dim START As Integer = 0
            Dim PAGE As Integer = 1
            Dim MAX_PAGE As Integer = 0
            '
            For I As Integer = 0 To D_PROJECT_CNT - 1
                MAX_PAGE = D_DAT.Tables(1).Rows(I).Item("project_no")
            Next
            '
            'Title
            For I As Integer = 0 To D_PROJECT_CNT - 1
                D_WHERE = "project_no = " & D_DAT.Tables(1).Rows(I).Item("project_no")
                Dim result() As DataRow = D_DAT.Tables(0).Select(D_WHERE)
                count1 = result.Count
                START = D_ROW
                D_EXL_SHT.Cells(3 + D_ROW, 13) = PAGE.ToString + "/" + D_DAT.Tables(1).Rows(I).Item("page_size").ToString
                For J As Integer = 0 To count1 - 1
                    D_EXL_SHT.Cells(5 + J + D_ROW, 2) = J + 1
                    D_EXL_SHT.Cells(5 + J + D_ROW, 3) = result(J).Item("cost_data_rpt_date")
                    D_EXL_SHT.Cells(5 + J + D_ROW, 4) = result(J).Item("company_project")
                    D_EXL_SHT.Cells(5 + J + D_ROW, 5) = result(J).Item("purchase_recorded_date")
                    D_EXL_SHT.Cells(5 + J + D_ROW, 7) = result(J).Item("vendor_nm")
                    D_EXL_SHT.Cells(5 + J + D_ROW, 9) = result(J).Item("item_nm")
                    D_EXL_SHT.Cells(5 + J + D_ROW, 11) = result(J).Item("cost_qty")
                    D_EXL_SHT.Cells(5 + J + D_ROW, 12) = result(J).Item("cost_upr")
                    D_EXL_SHT.Cells(5 + J + D_ROW, 13) = result(J).Item("cost_amt")
                    '
                    If J < count1 - 1 Then
                        D_EXL_SHT.Rows("5:5").Copy()
                        D_EXL_SHT.Rows(6 + J + D_ROW).Insert()
                        D_EXL_SHT.Rows(6 + J + D_ROW).Select()
                        D_EXL_SHT.Paste()
                    End If
                    '
                    'Record 30 then paginate
                    If J Mod 29 = 0 And J <> 0 Then
                        D_EXL_SHT.Rows(6 + J + D_ROW).PageBreak = XlPageBreak.xlPageBreakManual
                        PAGE += 1
                        D_EXL_BOK.Sheets(2).Rows("1:6").Copy()
                        D_EXL_SHT.Rows(6 + J + D_ROW).PasteSpecial()
                        D_EXL_SHT.Cells(6 + J + D_ROW + 2, 13) = PAGE.ToString + "/" + D_DAT.Tables(1).Rows(I).Item("page_size").ToString
                        D_ROW += 4
                    End If
                Next
                'Fill dong tong
                D_ROW += count1
                '
                D_EXL_SHT.Cells(5 + D_ROW, 11).Formula = "=SUM(K" & 5 + START & ":K" & (D_ROW - 1 + 5).ToString & ")"
                D_EXL_SHT.Cells(5 + D_ROW, 12).Formula = "=SUM(L" & 5 + START & ":L" & (D_ROW - 1 + 5).ToString & ")"
                D_EXL_SHT.Cells(5 + D_ROW, 13).Formula = "=SUM(M" & 5 + START & ":M" & (D_ROW - 1 + 5).ToString & ")"
                '

                'Phan trang
                If I < D_PROJECT_CNT - 1 Then
                    D_EXL_SHT.Rows(6 + D_ROW).PageBreak = XlPageBreak.xlPageBreakManual
                    PAGE = 1
                    D_EXL_BOK.Sheets(2).Rows("1:6").Copy()
                    D_EXL_SHT.Rows(6 + D_ROW).PasteSpecial()
                    D_ROW += 5
                End If

            Next
            '
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
        FNC_EXL_L013 = "{" + """" + "status" + """" + ":" + D_status + "," + """" + "filename" + """" + ":" + """" + D_FullName + """" + "}"
        Exit Function

    End Function

End Class
