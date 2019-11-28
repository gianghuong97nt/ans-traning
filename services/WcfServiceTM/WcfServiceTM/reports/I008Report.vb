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
Public Class I008Report

    Public Sub New()

        ' この呼び出しは、Windows フォーム デザイナで必要です。
        InitializeComponent()

    End Sub

    Private Sub PageHeader1_Format(sender As Object, e As EventArgs) Handles PageHeader1.Format
        Try
            'TXT_DATE.Value = Format(Now, "yyyy/MM/dd")
        Catch ex As Exception
            Call Utl_ERR.FNC_ERR_RTN(ex)
        End Try
EXIT_SUB:
        Exit Sub
    End Sub

    Private Sub PageHeader1_BeforePrint(sender As Object, e As EventArgs) Handles PageHeader1.BeforePrint
        Try
            'If TXT_Page1.Value > TXT_Page2.Value Then
            '    TXT_Page2.Value = TXT_Page1.Value
            'End If
        Catch ex As Exception
            Call Utl_ERR.FNC_ERR_RTN(ex)
        End Try
EXIT_SUB:
        Exit Sub
    End Sub

    Private Sub GroupFooter1_Format(sender As Object, e As EventArgs) Handles GroupFooter1.Format
        'Dim D_valu1 As Decimal = Decimal.Parse(TXT_20.Text) - Decimal.Parse(TXT_21.Text)
        'TXT_22.Text = Format(D_valu1, "#,##0")


        'Dim D_value2 As Decimal = Decimal.Parse(TXT_26.Text) - Decimal.Parse(TXT_27.Text)

        'TXT_28.Text = Format(D_value2, "#,##0")

        'If (Decimal.Parse(TXT_20.Text) = 0) Then
        '    TXT_29.Text = String.Empty
        'Else
        '    TXT_29.Text = Format(Decimal.Parse(TXT_26.Text) / Decimal.Parse(TXT_20.Text), "0.00%")
        'End If
        'If (Decimal.Parse(TXT_21.Text) = 0) Then
        '    TextBox1.Text = String.Empty
        'Else
        '    TextBox1.Text = Format(Decimal.Parse(TXT_27.Text) / Decimal.Parse(TXT_21.Text), "0.00%")
        'End If
    End Sub

    Private Sub PageFooter1_Format(sender As Object, e As EventArgs)

    End Sub

    Private Sub GroupHeader1_Format(sender As Object, e As EventArgs) Handles GroupHeader1.Format

    End Sub

    Private Sub Detail_Format(sender As Object, e As EventArgs) Handles Detail.Format

    End Sub
End Class
