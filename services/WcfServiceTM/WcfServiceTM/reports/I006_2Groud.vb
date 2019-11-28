''' 機能概要*****************************************************************************************************
''' <summary>
''' 号車マスタ
''' </summary>
''' <remarks></remarks>
''' 
''' 作成者  ：BINHNN   2014-07-27
'''
''' *************************************************************************************************************
''' 
Public Class I006_2Groud
    Dim detail_type_div_name As String = ""
    Dim order_no As String = ""

    Public Sub New()

        ' この呼び出しは、Windows フォーム デザイナで必要です。
        InitializeComponent()

    End Sub

    Private Sub PageHeader1_Format(sender As Object, e As EventArgs) Handles PageHeader1.Format

EXIT_SUB:
        Exit Sub
    End Sub

    Private Sub PageHeader1_BeforePrint(sender As Object, e As EventArgs) Handles PageHeader1.BeforePrint

EXIT_SUB:
        Exit Sub
    End Sub

    Private Sub GroupFooter1_Format(sender As Object, e As EventArgs) Handles GroupFooter1.Format

    End Sub

    Private Sub ReportHeader1_Format(sender As Object, e As EventArgs) Handles ReportHeader1.Format
        
    End Sub

    Private Sub Detail_Format(sender As Object, e As EventArgs) Handles Detail.Format
        If detail_type_div_name <> TXT_detail_type_div_name.Text Then
            TXT_detail_type_div_name.Visible = True
        Else
            TXT_detail_type_div_name.Visible = False
        End If

        If order_no <> TXT_order_no.Text Then
            TXT_order_no.Visible = True
        Else
            TXT_order_no.Visible = False
        End If
        detail_type_div_name = TXT_detail_type_div_name.Text
        order_no = TXT_order_no.Text
    End Sub
End Class
