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

Public Class Frm_R001


    Public Function FNC_EXL_R001(
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
            D_EXL_TML = ConfigurationManager.AppSettings("FIL_TEM_EXL") & "\R001.xlsx"
            D_File_Log = ConfigurationManager.AppSettings("FIL_LOG")
            '
            D_Name = "R001_" & System.Guid.NewGuid.ToString() & Format(Date.Now, "yyyyMMddHHmmss")
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
            Dim no As String = ""
            Dim D_GROUP_DIV As Integer = 0
            Dim D_GROUP_ROW As Integer = 0
            Dim D_Page As Integer = 25
            Dim D_ROW As Integer = 0 'giup xac dinh vi tri cua ban ghi trong file
            'tim max so nhom
            D_GROUP_DIV = D_DAT.Tables(1).Rows.Count
            'for chay nhom
            For I As Integer = 0 To D_GROUP_DIV - 1
                'tim dieu kien tao table
                no = D_DAT.Tables(1).Rows(I).Item("no")
                'tao table
                Dim DataRow As DataRow() = D_DAT.Tables(0).Select(" no = " + "'" + no + "'")
                'tim tong ban ghi cua table moi tao
                D_GROUP_ROW = DataRow.Count
                'find head
                D_EXL_SHT.Cells(1 + D_ROW, 2) = no
                D_EXL_SHT.Cells(5 + D_ROW, 1) = DataRow(0).Item("order_confiemed_date")
                D_EXL_SHT.Cells(6 + D_ROW, 1) = DataRow(0).Item("client_nm")
                D_EXL_SHT.Cells(6 + D_ROW, 9) = DataRow(0).Item("client_staff_nm")
                D_EXL_SHT.Cells(8 + D_ROW, 3) = DataRow(0).Item("delivery_scheduled_date")
                D_EXL_SHT.Cells(9 + D_ROW, 3) = DataRow(0).Item("delivery_location")
                D_EXL_SHT.Cells(10 + D_ROW, 3) = DataRow(0).Item("dealing_mode_div_name")
                D_EXL_SHT.Cells(11 + D_ROW, 3) = DataRow(0).Item("quote_period_div")
                D_EXL_SHT.Cells(8 + D_ROW, 10) = DataRow(0).Item("company_nm")
                D_EXL_SHT.Cells(11 + D_ROW, 9) = "TEL. " + DataRow(0).Item("company_tel")
                D_EXL_SHT.Cells(14 + D_ROW, 10) = DataRow(0).Item("emp_nm")
                'in bang ghi
                For J As Integer = 0 To D_GROUP_ROW - 1
                    'in ban ghi
                    D_EXL_SHT.Cells(16 + D_ROW + J, 2) = DataRow(J).Item("content")
                    D_EXL_SHT.Cells(16 + D_ROW + J, 5) = DataRow(J).Item("remarks")
                    D_EXL_SHT.Cells(16 + D_ROW + J, 6) = DataRow(J).Item("real_qty")
                    D_EXL_SHT.Cells(16 + D_ROW + J, 7) = DataRow(J).Item("sales_upr")
                    D_EXL_SHT.Cells(16 + D_ROW + J, 8) = DataRow(J).Item("sales_amt")
                    D_EXL_SHT.Cells(16 + D_ROW + J, 9) = DataRow(J).Item("tax_money")
                    D_EXL_SHT.Cells(16 + D_ROW + J, 10) = DataRow(J).Item("total")
                    '
                    If J = D_Page - 1 Then
                        D_EXL_SHT.Rows("15:15").Copy()
                        D_EXL_SHT.Rows(D_ROW + J + 17).Insert()
                        D_EXL_SHT.Rows(D_ROW + J + 17).Select()
                        D_EXL_SHT.Paste()
                        D_Page = D_Page + 25
                        D_ROW = D_ROW + 1
                    End If
                    If J > 12 And J < D_GROUP_ROW - 1 Then 'tao dinh dang cua dong tiep theo
                        D_EXL_SHT.Rows("16:16").Copy()
                        D_EXL_SHT.Rows(17 + D_ROW + J).Insert()
                        D_EXL_SHT.Rows(17 + D_ROW + J).Select()
                        D_EXL_SHT.Paste()
                    End If
                Next
                If D_GROUP_ROW > 24 Then
                    D_ROW = D_ROW + D_GROUP_ROW + 17
                    D_EXL_SHT.Rows(D_ROW - 1).Delete()
                Else
                    D_ROW = D_ROW + 31
                End If

                If I < D_GROUP_DIV - 1 Then 'tach trang
                    D_EXL_SHT.Range("A" + (D_ROW + 1).ToString).PageBreak = 1 'tach trang
                    D_EXL_SHT.Rows("1:31").Copy()
                    D_EXL_SHT.Rows(D_ROW + 1).PasteSpecial()
                End If
            Next
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
            Utl_ERR.WriteLogReport(ex.ToString(), "R001")
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
        FNC_EXL_R001 = "{" + """" + "status" + """" + ":" + D_status + "," + """" + "filename" + """" + ":" + """" + D_FullName + """" + "}"
        Exit Function

    End Function

End Class
