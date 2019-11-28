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

Public Class Frm_R003

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
        Dim D_COMP_PROJECT_CNT As Integer
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
            D_EXL_TML = ConfigurationManager.AppSettings("FIL_TEM_EXL") & "\r003.xlsx"
            D_File_Log = ConfigurationManager.AppSettings("FIL_LOG")
            '
            D_Name = "R003_" & System.Guid.NewGuid.ToString() & Format(Date.Now, "yyyyMMddHHmmss")
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
            D_COMP_PROJECT_CNT = D_DAT.Tables(0).Rows.Count
            Dim D_WHERE As String = ""
            Dim NAME_SHT As String = ""
            '
            'Title
            For I As Integer = 0 To D_COMP_PROJECT_CNT - 1
                NAME_SHT = D_DAT.Tables(0).Rows(I).Item("company_cd").ToString + "_" + D_DAT.Tables(0).Rows(I).Item("project_no").ToString
                D_EXL_BOK.Sheets(1).Copy(After:=D_EXL_BOK.Sheets(I + 1))
                D_EXL_BOK.Sheets(I + 2).Name = NAME_SHT
                D_EXL_SHT = D_EXL_BOK.Sheets(NAME_SHT)

                D_WHERE = "company_cd = " & D_DAT.Tables(0).Rows(I).Item("company_cd") & "AND project_no = " & D_DAT.Tables(0).Rows(I).Item("project_no")
                Dim result() As DataRow = D_DAT.Tables(0).Select(D_WHERE)
                Dim result2() As DataRow = D_DAT.Tables(1).Select(D_WHERE)
                Dim result3() As DataRow = D_DAT.Tables(2).Select(D_WHERE)

                D_EXL_SHT.Cells(2, 7) = result(0).Item("client_nm")
                D_EXL_SHT.Cells(2, 41) = result(0).Item("sales_recorded_date")
                D_EXL_SHT.Cells(2, 52) = result(0).Item("emp_nm")
                D_EXL_SHT.Cells(2, 66) = result(0).Item("time")
                D_EXL_SHT.Cells(4, 7) = result(0).Item("project_nm")
                D_EXL_SHT.Cells(4, 39) = result(0).Item("company_cd") & "_" & result(0).Item("project_no")

                For K As Integer = 0 To result2.Length - 1
                    D_EXL_SHT.Cells(5 + K, 64) = result2(0).Item("rev_date")
                    D_EXL_SHT.Cells(5 + K, 68) = result2(0).Item("rev_content")
                Next

                Dim D_COMP_PROJECT_CNT2 As Integer = result3.Length
                If D_COMP_PROJECT_CNT2 > 10 Then
                    D_COMP_PROJECT_CNT2 = 10
                End If
                For J As Integer = 0 To D_COMP_PROJECT_CNT2 - 1
                    D_EXL_SHT.Cells(76 + J, 2) = result3(J).Item("content")
                    D_EXL_SHT.Cells(76 + J, 34) = result3(J).Item("real_qty")
                Next
                '
                D_EXL_SHT.Cells(1, 1).Activate()
            Next
            D_EXL_BOK.Sheets(1).Delete()
            '
ACTIVE:
            '
            D_EXL_BOK.Activate()
            D_EXL_BOK.Sheets(1).Activate()

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
