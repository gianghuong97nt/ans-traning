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
Public Class L0132Report
    Dim D_company_project_chk As String = ""

    Public Sub New()

        ' この呼び出しは、Windows フォーム デザイナで必要です。
        InitializeComponent()

    End Sub

    Private Sub GroupHeader1_Format(sender As Object, e As EventArgs) Handles GroupHeader1.Format
    End Sub


    Private Sub GroupFooter1_Format(sender As Object, e As EventArgs) Handles GroupFooter1.Format

    End Sub

    Private Sub Detail_Format(sender As Object, e As EventArgs) Handles Detail.Format
        Try
            Dim D_company_project As String = TXT_company_project.Text
            '
            If D_company_project_chk <> D_company_project Then
                '
                TXT_company_project.Visible = True
            Else
                '
                TXT_company_project.Visible = False
            End If
            '
            D_company_project_chk = D_company_project
        Catch ex As Exception
            Call Utl_ERR.FNC_ERR_RTN(ex)
        End Try
    End Sub
End Class
