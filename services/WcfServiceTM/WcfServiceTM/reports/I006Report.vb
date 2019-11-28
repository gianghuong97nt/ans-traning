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
Public Class I006Report

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

    Private Sub GroupHeader1_Format(sender As Object, e As EventArgs) Handles GroupHeader1.Format

    End Sub

    Private Sub Detail_Format(sender As Object, e As EventArgs) Handles Detail.Format

    End Sub

    Private Sub GroupFooter1_Format(sender As Object, e As EventArgs) Handles GroupFooter1.Format

    End Sub
End Class
