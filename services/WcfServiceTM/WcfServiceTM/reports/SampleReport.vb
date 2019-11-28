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
Public Class SampleReport

    Public Sub New()

        ' この呼び出しは、Windows フォーム デザイナで必要です。
        InitializeComponent()

    End Sub

Private Sub PageHeader1_Format(sender As Object, e As EventArgs) Handles PageHeader1.Format
    Try
            TXT_DATE.Value = Format(Now, "yyyy/MM/dd")
    Catch ex As Exception
        Call Utl_ERR.FNC_ERR_RTN(ex)
    End Try
EXIT_SUB:
    Exit Sub
End Sub

    Private Sub PageHeader1_BeforePrint(sender As Object, e As EventArgs) Handles PageHeader1.BeforePrint
        Try
            If TXT_Page1.Value > TXT_Page2.Value Then
                TXT_Page2.Value = TXT_Page1.Value
            End If
        Catch ex As Exception
            Call Utl_ERR.FNC_ERR_RTN(ex)
        End Try
EXIT_SUB:
        Exit Sub
    End Sub

    
End Class
