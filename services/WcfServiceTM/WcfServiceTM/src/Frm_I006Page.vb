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

Public Class Frm_I006Page


    Public Function FNC_EXL_I006_Page(
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
            D_EXL_TML = ConfigurationManager.AppSettings("FIL_TEM_EXL") & "\i006Page.xlsx"
            D_File_Log = ConfigurationManager.AppSettings("FIL_LOG")
            '
            D_Name = "I006Page_" & System.Guid.NewGuid.ToString() & Format(Date.Now, "yyyyMMddHHmmss")
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
            Dim detail_type_div As String = ""
            Dim D_GROUP_DIV As Integer = 0
            Dim D_GROUP_ROW As Integer = 0
            Dim D_ROW As Integer = 0 'giup xac dinh vi tri cua ban ghi trong file
            Dim D_Page As Integer = 1 'so page
            Dim D_MAXPage As Integer = 1 'so page cua 1 nhom
            Dim D_Row_Page As Integer = 34 'max ban ghi 1 trang
            'tim max so nhom
            D_GROUP_DIV = D_DAT.Tables(1).Rows.Count
            'for chay nhom
            For I As Integer = 0 To D_GROUP_DIV - 1
                'tim dieu kien tao table
                detail_type_div = D_DAT.Tables(1).Rows(I).Item("detail_type_div")
                'tao table
                Dim DataRow As DataRow() = D_DAT.Tables(0).Select("detail_type_div = " + detail_type_div)
                'tim tong ban ghi cua table moi tao
                D_GROUP_ROW = DataRow.Count
                D_Page = 1
                D_MAXPage = 1
                'tim max page
                If D_GROUP_ROW Mod D_Row_Page > 0 Then 'chia co du
                    D_MAXPage = D_GROUP_ROW / D_Row_Page + 1
                Else ' chia ko du
                    D_MAXPage = D_GROUP_ROW / D_Row_Page
                End If
                'in vo so page
                D_EXL_SHT.Cells(D_ROW + 2, 12) = D_Page.ToString + "/" + D_MAXPage.ToString
                'in bang ghi
                For J As Integer = 0 To D_GROUP_ROW - 1
                    'in ban ghi
                    D_EXL_SHT.Cells(5 + D_ROW + J, 1) = J + 1
                    D_EXL_SHT.Cells(5 + D_ROW + J, 2) = DataRow(J).Item("detail_type_div_name")
                    D_EXL_SHT.Cells(5 + D_ROW + J, 3) = DataRow(J).Item("order_no")
                    D_EXL_SHT.Cells(5 + D_ROW + J, 4) = DataRow(J).Item("contents")
                    D_EXL_SHT.Cells(5 + D_ROW + J, 6) = DataRow(J).Item("order_qty")
                    D_EXL_SHT.Cells(5 + D_ROW + J, 7) = DataRow(J).Item("order_upr")
                    D_EXL_SHT.Cells(5 + D_ROW + J, 8) = DataRow(J).Item("order_amt")
                    D_EXL_SHT.Cells(5 + D_ROW + J, 9) = DataRow(J).Item("sales_amt")
                    D_EXL_SHT.Cells(5 + D_ROW + J, 10) = DataRow(J).Item("vendor")
                    D_EXL_SHT.Cells(5 + D_ROW + J, 11) = DataRow(J).Item("vendor_nm")
                    '
                    If J = D_Row_Page Then 'j bang voi max ban ghi tren 1 trang
                        D_EXL_BOK.Sheets(2).Rows("1:5").Copy() ' copy dinh dang tu sheet 2
                        D_EXL_SHT.Rows(D_ROW + 6 + 34).PasteSpecial() 'dan vao sheet 1 - vi tri hien tai da sang trang nen ko can tach trang
                        D_Page = D_Page + 1 'tang so trang len 1
                        D_EXL_SHT.Cells(D_ROW + 6 + 35, 12) = D_Page.ToString + "/" + D_MAXPage.ToString 'in so trang
                        D_ROW = D_ROW + 4
                        D_Row_Page = D_Row_Page + 34 'dieu kien tach trang tiep theo
                    End If
                    '
                    If J < D_GROUP_ROW - 1 Then 'tao dinh dang cua dong tiep theo
                        D_EXL_SHT.Rows("5:5").Copy()
                        D_EXL_SHT.Rows(6 + D_ROW + J).Insert()
                        D_EXL_SHT.Rows(6 + D_ROW + J).Select()
                        D_EXL_SHT.Paste()
                    End If

                Next
                D_ROW = D_ROW + D_GROUP_ROW
                '
                If I < D_GROUP_DIV Then 'in sum cua cac nhom
                    D_EXL_BOK.Sheets(2).Rows("6:6").Copy()
                    D_EXL_SHT.Rows(D_ROW + 5).PasteSpecial()
                    D_EXL_SHT.Cells(D_ROW + 5, 6) = D_DAT.Tables(1).Rows(I).Item("sum_order_qty")
                    D_EXL_SHT.Cells(D_ROW + 5, 7) = D_DAT.Tables(1).Rows(I).Item("sum_order_upr")
                    D_EXL_SHT.Cells(D_ROW + 5, 8) = D_DAT.Tables(1).Rows(I).Item("sum_order_amt")
                    D_EXL_SHT.Cells(D_ROW + 5, 9) = D_DAT.Tables(1).Rows(I).Item("sum_sales_amt")
                    D_ROW = D_ROW + 1
                End If
                '
                If I < D_GROUP_DIV - 1 Then 'tach trang
                    D_EXL_SHT.Range("A" + (6 + D_ROW).ToString).PageBreak = 1 'tach trang
                    D_EXL_BOK.Sheets(2).Rows("1:5").Copy()
                    D_EXL_SHT.Rows(D_ROW + 6).PasteSpecial()
                End If
                D_ROW = D_ROW + 5
            Next
ACTIVE:
            '
            D_EXL_BOK.Sheets(2).Delete()
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
        FNC_EXL_I006_Page = "{" + """" + "status" + """" + ":" + D_status + "," + """" + "filename" + """" + ":" + """" + D_FullName + """" + "}"
        Exit Function

    End Function

End Class
