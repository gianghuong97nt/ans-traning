<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
Partial Public Class I008Report
    Inherits GrapeCity.ActiveReports.SectionReport

    'ActiveReport がコンポーネントの一覧をクリーンアップするために dispose をオーバーライドします。
    Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
        If disposing Then
        End If
        MyBase.Dispose(disposing)
    End Sub

    'メモ: 以下のプロシージャは ActiveReport デザイナで必要です。
    'ActiveReport デザイナを使用して変更できます。  
    'コード エディタを使って変更しないでください。



    <System.Diagnostics.DebuggerStepThrough()>
    Private Sub InitializeComponent()
        Dim resources As System.Resources.ResourceManager = New System.Resources.ResourceManager(GetType(I008Report))
        Me.Detail = New GrapeCity.ActiveReports.SectionReportModel.Detail()
        Me.TXT_sales_estimate_amt = New GrapeCity.ActiveReports.SectionReportModel.TextBox()
        Me.TXT_percent = New GrapeCity.ActiveReports.SectionReportModel.TextBox()
        Me.TXT_gross_estimate_amt = New GrapeCity.ActiveReports.SectionReportModel.TextBox()
        Me.TXT_estimate_ym = New GrapeCity.ActiveReports.SectionReportModel.TextBox()
        Me.Line18 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.Line19 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.Line21 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.Line25 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.Line29 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.Line2 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.ReportHeader1 = New GrapeCity.ActiveReports.SectionReportModel.ReportHeader()
        Me.ReportFooter1 = New GrapeCity.ActiveReports.SectionReportModel.ReportFooter()
        Me.PageHeader1 = New GrapeCity.ActiveReports.SectionReportModel.PageHeader()
        Me.Label1 = New GrapeCity.ActiveReports.SectionReportModel.Label()
        Me.RPT_page = New GrapeCity.ActiveReports.SectionReportModel.ReportInfo()
        Me.RPT_date = New GrapeCity.ActiveReports.SectionReportModel.ReportInfo()
        Me.PageFooter1 = New GrapeCity.ActiveReports.SectionReportModel.PageFooter()
        Me.GroupHeader1 = New GrapeCity.ActiveReports.SectionReportModel.GroupHeader()
        Me.TBL_gross_estimate_amt = New GrapeCity.ActiveReports.SectionReportModel.TextBox()
        Me.TBL_sales_estimate_amt = New GrapeCity.ActiveReports.SectionReportModel.TextBox()
        Me.TBL_percent = New GrapeCity.ActiveReports.SectionReportModel.TextBox()
        Me.TBL_month = New GrapeCity.ActiveReports.SectionReportModel.TextBox()
        Me.Line3 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.Line5 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.Line7 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.Line8 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.Line12 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.Line17 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.Line1 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.LBL_emp_cd = New GrapeCity.ActiveReports.SectionReportModel.TextBox()
        Me.TXT_emp_nm = New GrapeCity.ActiveReports.SectionReportModel.TextBox()
        Me.GroupFooter1 = New GrapeCity.ActiveReports.SectionReportModel.GroupFooter()
        Me.TextBox7 = New GrapeCity.ActiveReports.SectionReportModel.TextBox()
        Me.TextBox6 = New GrapeCity.ActiveReports.SectionReportModel.TextBox()
        Me.TextBox5 = New GrapeCity.ActiveReports.SectionReportModel.TextBox()
        Me.LBL_sum = New GrapeCity.ActiveReports.SectionReportModel.Label()
        Me.Line32 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.Line33 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.Line34 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.Line9 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.Line11 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        Me.Line13 = New GrapeCity.ActiveReports.SectionReportModel.Line()
        CType(Me.TXT_sales_estimate_amt, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.TXT_percent, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.TXT_gross_estimate_amt, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.TXT_estimate_ym, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.Label1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.RPT_page, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.RPT_date, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.TBL_gross_estimate_amt, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.TBL_sales_estimate_amt, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.TBL_percent, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.TBL_month, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.LBL_emp_cd, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.TXT_emp_nm, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.TextBox7, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.TextBox6, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.TextBox5, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.LBL_sum, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New GrapeCity.ActiveReports.SectionReportModel.ARControl() {Me.TXT_sales_estimate_amt, Me.TXT_percent, Me.TXT_gross_estimate_amt, Me.TXT_estimate_ym, Me.Line18, Me.Line19, Me.Line21, Me.Line25, Me.Line29, Me.Line2})
        Me.Detail.Height = 0.1968504!
        Me.Detail.KeepTogether = True
        Me.Detail.Name = "Detail"
        '
        'TXT_sales_estimate_amt
        '
        Me.TXT_sales_estimate_amt.DataField = "sales_estimate_amt"
        Me.TXT_sales_estimate_amt.DistinctField = ""
        Me.TXT_sales_estimate_amt.Height = 0.1968504!
        Me.TXT_sales_estimate_amt.Left = 2.365748!
        Me.TXT_sales_estimate_amt.MultiLine = False
        Me.TXT_sales_estimate_amt.Name = "TXT_sales_estimate_amt"
        Me.TXT_sales_estimate_amt.OutputFormat = resources.GetString("TXT_sales_estimate_amt.OutputFormat")
        Me.TXT_sales_estimate_amt.Style = "color: Black; font-weight: bold; text-align: right; vertical-align: middle"
        Me.TXT_sales_estimate_amt.SummaryGroup = ""
        Me.TXT_sales_estimate_amt.Text = Nothing
        Me.TXT_sales_estimate_amt.Top = 0!
        Me.TXT_sales_estimate_amt.Width = 1.668504!
        '
        'TXT_percent
        '
        Me.TXT_percent.DataField = "percent"
        Me.TXT_percent.DistinctField = ""
        Me.TXT_percent.Height = 0.1968504!
        Me.TXT_percent.Left = 5.782678!
        Me.TXT_percent.MultiLine = False
        Me.TXT_percent.Name = "TXT_percent"
        Me.TXT_percent.Style = "color: Black; font-weight: bold; text-align: right; vertical-align: middle"
        Me.TXT_percent.SummaryGroup = ""
        Me.TXT_percent.Text = Nothing
        Me.TXT_percent.Top = 0!
        Me.TXT_percent.Width = 1.701575!
        '
        'TXT_gross_estimate_amt
        '
        Me.TXT_gross_estimate_amt.DataField = "gross_estimate_amt"
        Me.TXT_gross_estimate_amt.DistinctField = ""
        Me.TXT_gross_estimate_amt.Height = 0.1968504!
        Me.TXT_gross_estimate_amt.Left = 4.034252!
        Me.TXT_gross_estimate_amt.MultiLine = False
        Me.TXT_gross_estimate_amt.Name = "TXT_gross_estimate_amt"
        Me.TXT_gross_estimate_amt.OutputFormat = resources.GetString("TXT_gross_estimate_amt.OutputFormat")
        Me.TXT_gross_estimate_amt.Style = "color: Black; font-weight: bold; text-align: right; vertical-align: middle"
        Me.TXT_gross_estimate_amt.SummaryGroup = ""
        Me.TXT_gross_estimate_amt.Text = Nothing
        Me.TXT_gross_estimate_amt.Top = 0!
        Me.TXT_gross_estimate_amt.Width = 1.748473!
        '
        'TXT_estimate_ym
        '
        Me.TXT_estimate_ym.DataField = "estimate_ym"
        Me.TXT_estimate_ym.DistinctField = ""
        Me.TXT_estimate_ym.Height = 0.1968504!
        Me.TXT_estimate_ym.Left = 0.7523623!
        Me.TXT_estimate_ym.MultiLine = False
        Me.TXT_estimate_ym.Name = "TXT_estimate_ym"
        Me.TXT_estimate_ym.Style = "color: Black; font-weight: bold; text-align: center; vertical-align: middle"
        Me.TXT_estimate_ym.SummaryGroup = ""
        Me.TXT_estimate_ym.Text = Nothing
        Me.TXT_estimate_ym.Top = 0!
        Me.TXT_estimate_ym.Width = 1.613386!
        '
        'Line18
        '
        Me.Line18.Height = 0.1968504!
        Me.Line18.Left = 0.7513779!
        Me.Line18.LineWeight = 1.0!
        Me.Line18.Name = "Line18"
        Me.Line18.Top = 0!
        Me.Line18.Width = 0.0001968145!
        Me.Line18.X1 = 0.7515747!
        Me.Line18.X2 = 0.7513779!
        Me.Line18.Y1 = 0!
        Me.Line18.Y2 = 0.1968504!
        '
        'Line19
        '
        Me.Line19.Height = 0.1968504!
        Me.Line19.Left = 7.483858!
        Me.Line19.LineWeight = 1.0!
        Me.Line19.Name = "Line19"
        Me.Line19.Top = 0!
        Me.Line19.Width = 0.0000009536743!
        Me.Line19.X1 = 7.483858!
        Me.Line19.X2 = 7.483859!
        Me.Line19.Y1 = 0!
        Me.Line19.Y2 = 0.1968504!
        '
        'Line21
        '
        Me.Line21.Height = 0.1968504!
        Me.Line21.Left = 2.364567!
        Me.Line21.LineWeight = 1.0!
        Me.Line21.Name = "Line21"
        Me.Line21.Top = 0!
        Me.Line21.Width = 0!
        Me.Line21.X1 = 2.364567!
        Me.Line21.X2 = 2.364567!
        Me.Line21.Y1 = 0!
        Me.Line21.Y2 = 0.1968504!
        '
        'Line25
        '
        Me.Line25.Height = 0.1968504!
        Me.Line25.Left = 4.033071!
        Me.Line25.LineWeight = 1.0!
        Me.Line25.Name = "Line25"
        Me.Line25.Top = 0!
        Me.Line25.Width = 0!
        Me.Line25.X1 = 4.033071!
        Me.Line25.X2 = 4.033071!
        Me.Line25.Y1 = 0!
        Me.Line25.Y2 = 0.1968504!
        '
        'Line29
        '
        Me.Line29.Height = 0.1968504!
        Me.Line29.Left = 5.781496!
        Me.Line29.LineWeight = 1.0!
        Me.Line29.Name = "Line29"
        Me.Line29.Top = 0!
        Me.Line29.Width = 0!
        Me.Line29.X1 = 5.781496!
        Me.Line29.X2 = 5.781496!
        Me.Line29.Y1 = 0!
        Me.Line29.Y2 = 0.1968504!
        '
        'Line2
        '
        Me.Line2.Height = 0!
        Me.Line2.Left = 0.7464567!
        Me.Line2.LineWeight = 1.0!
        Me.Line2.Name = "Line2"
        Me.Line2.Top = 0.1968504!
        Me.Line2.Width = 6.732677!
        Me.Line2.X1 = 0.7464567!
        Me.Line2.X2 = 7.479134!
        Me.Line2.Y1 = 0.1968504!
        Me.Line2.Y2 = 0.1968504!
        '
        'ReportHeader1
        '
        Me.ReportHeader1.Height = 0!
        Me.ReportHeader1.Name = "ReportHeader1"
        '
        'ReportFooter1
        '
        Me.ReportFooter1.Height = 0!
        Me.ReportFooter1.Name = "ReportFooter1"
        '
        'PageHeader1
        '
        Me.PageHeader1.Controls.AddRange(New GrapeCity.ActiveReports.SectionReportModel.ARControl() {Me.Label1, Me.RPT_page, Me.RPT_date})
        Me.PageHeader1.Height = 0.6673328!
        Me.PageHeader1.Name = "PageHeader1"
        '
        'Label1
        '
        Me.Label1.Height = 0.335!
        Me.Label1.HyperLink = Nothing
        Me.Label1.Left = 2.018504!
        Me.Label1.Name = "Label1"
        Me.Label1.Style = "font-family: MS PGothic; font-size: 18pt; font-weight: bold; text-align: center; " &
    "vertical-align: middle; ddo-char-set: 1"
        Me.Label1.Text = "予算設定"
        Me.Label1.Top = 0.05984252!
        Me.Label1.Width = 3.543701!
        '
        'RPT_page
        '
        Me.RPT_page.FormatString = "Page  : {PageNumber}/{PageCount}"
        Me.RPT_page.Height = 0.2!
        Me.RPT_page.Left = 6.112599!
        Me.RPT_page.MultiLine = False
        Me.RPT_page.Name = "RPT_page"
        Me.RPT_page.Style = "color: Black; text-align: left"
        Me.RPT_page.SummaryGroup = "GroupHeader1"
        Me.RPT_page.SummaryRunning = GrapeCity.ActiveReports.SectionReportModel.SummaryRunning.Group
        Me.RPT_page.Top = 0.322441!
        Me.RPT_page.Width = 1.367323!
        '
        'RPT_date
        '
        Me.RPT_date.FormatString = "発行日 : {RunDateTime:yyyy/MM/dd}"
        Me.RPT_date.Height = 0.2!
        Me.RPT_date.Left = 6.116536!
        Me.RPT_date.MultiLine = False
        Me.RPT_date.Name = "RPT_date"
        Me.RPT_date.Style = "color: Black"
        Me.RPT_date.SummaryGroup = ""
        Me.RPT_date.Top = 0.05984252!
        Me.RPT_date.Width = 1.367323!
        '
        'PageFooter1
        '
        Me.PageFooter1.Height = 0!
        Me.PageFooter1.Name = "PageFooter1"
        '
        'GroupHeader1
        '
        Me.GroupHeader1.Controls.AddRange(New GrapeCity.ActiveReports.SectionReportModel.ARControl() {Me.TBL_sales_estimate_amt, Me.TBL_month, Me.TBL_gross_estimate_amt, Me.TBL_percent, Me.Line3, Me.Line5, Me.Line7, Me.Line8, Me.Line12, Me.Line17, Me.Line1, Me.LBL_emp_cd, Me.TXT_emp_nm})
        Me.GroupHeader1.DataField = "emp_cd"
        Me.GroupHeader1.Height = 0.4149607!
        Me.GroupHeader1.KeepTogether = True
        Me.GroupHeader1.Name = "GroupHeader1"
        Me.GroupHeader1.NewPage = GrapeCity.ActiveReports.SectionReportModel.NewPage.Before
        Me.GroupHeader1.RepeatStyle = GrapeCity.ActiveReports.SectionReportModel.RepeatStyle.OnPageIncludeNoDetail
        '
        'TBL_gross_estimate_amt
        '
        Me.TBL_gross_estimate_amt.DataField = ""
        Me.TBL_gross_estimate_amt.DistinctField = ""
        Me.TBL_gross_estimate_amt.Height = 0.1968504!
        Me.TBL_gross_estimate_amt.Left = 4.033071!
        Me.TBL_gross_estimate_amt.MultiLine = False
        Me.TBL_gross_estimate_amt.Name = "TBL_gross_estimate_amt"
        Me.TBL_gross_estimate_amt.Style = "background-color: Gray; color: Black; font-weight: bold; text-align: center; vert" &
    "ical-align: middle"
        Me.TBL_gross_estimate_amt.SummaryGroup = ""
        Me.TBL_gross_estimate_amt.Text = "利益予算"
        Me.TBL_gross_estimate_amt.Top = 0.2181102!
        Me.TBL_gross_estimate_amt.Width = 1.748425!
        '
        'TBL_sales_estimate_amt
        '
        Me.TBL_sales_estimate_amt.DataField = ""
        Me.TBL_sales_estimate_amt.DistinctField = ""
        Me.TBL_sales_estimate_amt.Height = 0.1968504!
        Me.TBL_sales_estimate_amt.Left = 2.364567!
        Me.TBL_sales_estimate_amt.MultiLine = False
        Me.TBL_sales_estimate_amt.Name = "TBL_sales_estimate_amt"
        Me.TBL_sales_estimate_amt.Style = "background-color: Gray; color: Black; font-weight: bold; text-align: center; vert" &
    "ical-align: middle"
        Me.TBL_sales_estimate_amt.SummaryGroup = ""
        Me.TBL_sales_estimate_amt.Text = "売上予算" & Global.Microsoft.VisualBasic.ChrW(13) & Global.Microsoft.VisualBasic.ChrW(10)
        Me.TBL_sales_estimate_amt.Top = 0.2181102!
        Me.TBL_sales_estimate_amt.Width = 1.668504!
        '
        'TBL_percent
        '
        Me.TBL_percent.DataField = ""
        Me.TBL_percent.DistinctField = ""
        Me.TBL_percent.Height = 0.1968504!
        Me.TBL_percent.Left = 5.783071!
        Me.TBL_percent.MultiLine = False
        Me.TBL_percent.Name = "TBL_percent"
        Me.TBL_percent.Style = "background-color: Gray; color: Black; font-weight: bold; text-align: center; vert" &
    "ical-align: middle"
        Me.TBL_percent.SummaryGroup = ""
        Me.TBL_percent.Text = "利益率"
        Me.TBL_percent.Top = 0.2181103!
        Me.TBL_percent.Width = 1.696064!
        '
        'TBL_month
        '
        Me.TBL_month.DataField = ""
        Me.TBL_month.DistinctField = ""
        Me.TBL_month.Height = 0.1968504!
        Me.TBL_month.Left = 0.7523623!
        Me.TBL_month.MultiLine = False
        Me.TBL_month.Name = "TBL_month"
        Me.TBL_month.Style = "background-color: Gray; color: Black; font-weight: bold; text-align: center; vert" &
    "ical-align: middle"
        Me.TBL_month.SummaryGroup = ""
        Me.TBL_month.Text = "月" & Global.Microsoft.VisualBasic.ChrW(13) & Global.Microsoft.VisualBasic.ChrW(10) & Global.Microsoft.VisualBasic.ChrW(13) & Global.Microsoft.VisualBasic.ChrW(10)
        Me.TBL_month.Top = 0.2181102!
        Me.TBL_month.Width = 1.613386!
        '
        'Line3
        '
        Me.Line3.Height = 0.00000008940697!
        Me.Line3.Left = 0.7515754!
        Me.Line3.LineWeight = 1.0!
        Me.Line3.Name = "Line3"
        Me.Line3.Top = 0.2181103!
        Me.Line3.Width = 6.732677!
        Me.Line3.X1 = 0.7515754!
        Me.Line3.X2 = 7.484252!
        Me.Line3.Y1 = 0.2181104!
        Me.Line3.Y2 = 0.2181103!
        '
        'Line5
        '
        Me.Line5.Height = 0.1968504!
        Me.Line5.Left = 0.7515749!
        Me.Line5.LineWeight = 1.0!
        Me.Line5.Name = "Line5"
        Me.Line5.Top = 0.2181102!
        Me.Line5.Width = 0!
        Me.Line5.X1 = 0.7515749!
        Me.Line5.X2 = 0.7515749!
        Me.Line5.Y1 = 0.2181102!
        Me.Line5.Y2 = 0.4149606!
        '
        'Line7
        '
        Me.Line7.Height = 0.1968504!
        Me.Line7.Left = 2.364568!
        Me.Line7.LineWeight = 1.0!
        Me.Line7.Name = "Line7"
        Me.Line7.Top = 0.2181103!
        Me.Line7.Width = 0!
        Me.Line7.X1 = 2.364568!
        Me.Line7.X2 = 2.364568!
        Me.Line7.Y1 = 0.2181103!
        Me.Line7.Y2 = 0.4149607!
        '
        'Line8
        '
        Me.Line8.Height = 0.1968504!
        Me.Line8.Left = 4.033072!
        Me.Line8.LineWeight = 1.0!
        Me.Line8.Name = "Line8"
        Me.Line8.Top = 0.2181103!
        Me.Line8.Width = 0!
        Me.Line8.X1 = 4.033072!
        Me.Line8.X2 = 4.033072!
        Me.Line8.Y1 = 0.2181103!
        Me.Line8.Y2 = 0.4149607!
        '
        'Line12
        '
        Me.Line12.Height = 0.1968504!
        Me.Line12.Left = 5.780709!
        Me.Line12.LineWeight = 1.0!
        Me.Line12.Name = "Line12"
        Me.Line12.Top = 0.2181103!
        Me.Line12.Width = 0!
        Me.Line12.X1 = 5.780709!
        Me.Line12.X2 = 5.780709!
        Me.Line12.Y1 = 0.2181103!
        Me.Line12.Y2 = 0.4149607!
        '
        'Line17
        '
        Me.Line17.Height = 0.1968504!
        Me.Line17.Left = 7.484252!
        Me.Line17.LineWeight = 1.0!
        Me.Line17.Name = "Line17"
        Me.Line17.Top = 0.2181102!
        Me.Line17.Width = 0!
        Me.Line17.X1 = 7.484252!
        Me.Line17.X2 = 7.484252!
        Me.Line17.Y1 = 0.2181102!
        Me.Line17.Y2 = 0.4149607!
        '
        'Line1
        '
        Me.Line1.Height = 0!
        Me.Line1.Left = 0.7523623!
        Me.Line1.LineWeight = 1.0!
        Me.Line1.Name = "Line1"
        Me.Line1.Top = 0.4149607!
        Me.Line1.Width = 6.726772!
        Me.Line1.X1 = 0.7523623!
        Me.Line1.X2 = 7.479134!
        Me.Line1.Y1 = 0.4149607!
        Me.Line1.Y2 = 0.4149607!
        '
        'LBL_emp_cd
        '
        Me.LBL_emp_cd.DistinctField = ""
        Me.LBL_emp_cd.Height = 0.1968504!
        Me.LBL_emp_cd.Left = 0.7456694!
        Me.LBL_emp_cd.MultiLine = False
        Me.LBL_emp_cd.Name = "LBL_emp_cd"
        Me.LBL_emp_cd.OutputFormat = resources.GetString("LBL_emp_cd.OutputFormat")
        Me.LBL_emp_cd.Style = "color: Black; font-weight: bold; text-align: left; vertical-align: middle"
        Me.LBL_emp_cd.SummaryGroup = ""
        Me.LBL_emp_cd.Text = "担当者 : "
        Me.LBL_emp_cd.Top = 0!
        Me.LBL_emp_cd.Width = 0.656693!
        '
        'TXT_emp_nm
        '
        Me.TXT_emp_nm.DataField = "emp_nm"
        Me.TXT_emp_nm.DistinctField = ""
        Me.TXT_emp_nm.Height = 0.1968504!
        Me.TXT_emp_nm.Left = 1.402362!
        Me.TXT_emp_nm.MultiLine = False
        Me.TXT_emp_nm.Name = "TXT_emp_nm"
        Me.TXT_emp_nm.OutputFormat = resources.GetString("TXT_emp_nm.OutputFormat")
        Me.TXT_emp_nm.Style = "color: Black; font-weight: bold; text-align: left; vertical-align: middle"
        Me.TXT_emp_nm.SummaryGroup = ""
        Me.TXT_emp_nm.Text = Nothing
        Me.TXT_emp_nm.Top = 0!
        Me.TXT_emp_nm.Width = 0.7917323!
        '
        'GroupFooter1
        '
        Me.GroupFooter1.Controls.AddRange(New GrapeCity.ActiveReports.SectionReportModel.ARControl() {Me.TextBox7, Me.TextBox6, Me.TextBox5, Me.LBL_sum, Me.Line32, Me.Line33, Me.Line34, Me.Line9, Me.Line11, Me.Line13})
        Me.GroupFooter1.Height = 0.3114337!
        Me.GroupFooter1.KeepTogether = True
        Me.GroupFooter1.Name = "GroupFooter1"
        '
        'TextBox7
        '
        Me.TextBox7.DistinctField = ""
        Me.TextBox7.Height = 0.1968504!
        Me.TextBox7.Left = 5.777559!
        Me.TextBox7.MultiLine = False
        Me.TextBox7.Name = "TextBox7"
        Me.TextBox7.Style = "color: Black; font-weight: bold; text-align: left; vertical-align: middle"
        Me.TextBox7.SummaryGroup = ""
        Me.TextBox7.Text = Nothing
        Me.TextBox7.Top = 0!
        Me.TextBox7.Width = 1.701575!
        '
        'TextBox6
        '
        Me.TextBox6.DataField = "gross_estimate_amt"
        Me.TextBox6.DistinctField = ""
        Me.TextBox6.Height = 0.1968504!
        Me.TextBox6.Left = 4.034252!
        Me.TextBox6.MultiLine = False
        Me.TextBox6.Name = "TextBox6"
        Me.TextBox6.OutputFormat = resources.GetString("TextBox6.OutputFormat")
        Me.TextBox6.Style = "color: Black; font-weight: bold; text-align: right; vertical-align: middle"
        Me.TextBox6.SummaryGroup = "GroupHeader1"
        Me.TextBox6.SummaryRunning = GrapeCity.ActiveReports.SectionReportModel.SummaryRunning.Group
        Me.TextBox6.SummaryType = GrapeCity.ActiveReports.SectionReportModel.SummaryType.SubTotal
        Me.TextBox6.Text = Nothing
        Me.TextBox6.Top = 0!
        Me.TextBox6.Width = 1.748473!
        '
        'TextBox5
        '
        Me.TextBox5.DataField = "sales_estimate_amt"
        Me.TextBox5.DistinctField = ""
        Me.TextBox5.Height = 0.1968504!
        Me.TextBox5.Left = 2.365748!
        Me.TextBox5.MultiLine = False
        Me.TextBox5.Name = "TextBox5"
        Me.TextBox5.OutputFormat = resources.GetString("TextBox5.OutputFormat")
        Me.TextBox5.Style = "color: Black; font-weight: bold; text-align: right; vertical-align: middle"
        Me.TextBox5.SummaryGroup = "GroupHeader1"
        Me.TextBox5.SummaryRunning = GrapeCity.ActiveReports.SectionReportModel.SummaryRunning.Group
        Me.TextBox5.SummaryType = GrapeCity.ActiveReports.SectionReportModel.SummaryType.SubTotal
        Me.TextBox5.Text = Nothing
        Me.TextBox5.Top = 0!
        Me.TextBox5.Width = 1.668504!
        '
        'LBL_sum
        '
        Me.LBL_sum.DataField = "company_nm"
        Me.LBL_sum.Height = 0.1968504!
        Me.LBL_sum.HyperLink = Nothing
        Me.LBL_sum.Left = 0.7515749!
        Me.LBL_sum.MultiLine = False
        Me.LBL_sum.Name = "LBL_sum"
        Me.LBL_sum.Style = "background-color: Gray; color: Black; font-family: MS Gothic; font-size: 10pt; fo" &
    "nt-weight: bold; text-align: center; text-justify: auto; vertical-align: middle;" &
    " ddo-char-set: 1"
        Me.LBL_sum.Text = "SUM" & Global.Microsoft.VisualBasic.ChrW(13) & Global.Microsoft.VisualBasic.ChrW(10)
        Me.LBL_sum.Top = 0!
        Me.LBL_sum.Width = 1.614173!
        '
        'Line32
        '
        Me.Line32.Height = 0!
        Me.Line32.Left = 0.7503937!
        Me.Line32.LineWeight = 1.0!
        Me.Line32.Name = "Line32"
        Me.Line32.Top = 0.1968504!
        Me.Line32.Width = 6.728741!
        Me.Line32.X1 = 0.7503937!
        Me.Line32.X2 = 7.479135!
        Me.Line32.Y1 = 0.1968504!
        Me.Line32.Y2 = 0.1968504!
        '
        'Line33
        '
        Me.Line33.Height = 0.1968504!
        Me.Line33.Left = 0.7503937!
        Me.Line33.LineWeight = 1.0!
        Me.Line33.Name = "Line33"
        Me.Line33.Top = 0!
        Me.Line33.Width = 0!
        Me.Line33.X1 = 0.7503937!
        Me.Line33.X2 = 0.7503937!
        Me.Line33.Y1 = 0!
        Me.Line33.Y2 = 0.1968504!
        '
        'Line34
        '
        Me.Line34.Height = 0.1968504!
        Me.Line34.Left = 7.483071!
        Me.Line34.LineWeight = 1.0!
        Me.Line34.Name = "Line34"
        Me.Line34.Top = 0!
        Me.Line34.Width = 0!
        Me.Line34.X1 = 7.483071!
        Me.Line34.X2 = 7.483071!
        Me.Line34.Y1 = 0!
        Me.Line34.Y2 = 0.1968504!
        '
        'Line9
        '
        Me.Line9.Height = 0.1968504!
        Me.Line9.Left = 2.36378!
        Me.Line9.LineWeight = 1.0!
        Me.Line9.Name = "Line9"
        Me.Line9.Top = 0!
        Me.Line9.Width = 0!
        Me.Line9.X1 = 2.36378!
        Me.Line9.X2 = 2.36378!
        Me.Line9.Y1 = 0!
        Me.Line9.Y2 = 0.1968504!
        '
        'Line11
        '
        Me.Line11.Height = 0.1968504!
        Me.Line11.Left = 4.032284!
        Me.Line11.LineWeight = 1.0!
        Me.Line11.Name = "Line11"
        Me.Line11.Top = 0!
        Me.Line11.Width = 0!
        Me.Line11.X1 = 4.032284!
        Me.Line11.X2 = 4.032284!
        Me.Line11.Y1 = 0!
        Me.Line11.Y2 = 0.1968504!
        '
        'Line13
        '
        Me.Line13.Height = 0.1968504!
        Me.Line13.Left = 5.780709!
        Me.Line13.LineWeight = 1.0!
        Me.Line13.Name = "Line13"
        Me.Line13.Top = 0!
        Me.Line13.Width = 0!
        Me.Line13.X1 = 5.780709!
        Me.Line13.X2 = 5.780709!
        Me.Line13.Y1 = 0!
        Me.Line13.Y2 = 0.1968504!
        '
        'I008Report
        '
        Me.MasterReport = False
        Me.PageSettings.DefaultPaperSize = False
        Me.PageSettings.Margins.Bottom = 0.3!
        Me.PageSettings.Margins.Left = 0.4!
        Me.PageSettings.Margins.Right = 0.315748!
        Me.PageSettings.Margins.Top = 0.4!
        Me.PageSettings.PaperHeight = 11.69291!
        Me.PageSettings.PaperKind = System.Drawing.Printing.PaperKind.A4
        Me.PageSettings.PaperWidth = 8.267716!
        Me.PrintWidth = 7.514306!
        Me.Sections.Add(Me.ReportHeader1)
        Me.Sections.Add(Me.PageHeader1)
        Me.Sections.Add(Me.GroupHeader1)
        Me.Sections.Add(Me.Detail)
        Me.Sections.Add(Me.GroupFooter1)
        Me.Sections.Add(Me.PageFooter1)
        Me.Sections.Add(Me.ReportFooter1)
        Me.StyleSheet.Add(New DDCssLib.StyleSheetRule("font-style: normal; text-decoration: none; font-weight: normal; font-size: 10pt; " &
            "color: Black; font-family: MS Gothic; ddo-char-set: 128", "Normal"))
        Me.StyleSheet.Add(New DDCssLib.StyleSheetRule("font-size: 16pt; font-weight: bold", "Heading1", "Normal"))
        Me.StyleSheet.Add(New DDCssLib.StyleSheetRule("font-size: 14pt; font-weight: bold", "Heading2", "Normal"))
        Me.StyleSheet.Add(New DDCssLib.StyleSheetRule("font-size: 13pt; font-weight: bold", "Heading3", "Normal"))
        CType(Me.TXT_sales_estimate_amt, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.TXT_percent, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.TXT_gross_estimate_amt, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.TXT_estimate_ym, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.Label1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.RPT_page, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.RPT_date, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.TBL_gross_estimate_amt, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.TBL_sales_estimate_amt, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.TBL_percent, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.TBL_month, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.LBL_emp_cd, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.TXT_emp_nm, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.TextBox7, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.TextBox6, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.TextBox5, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.LBL_sum, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub















































    Private WithEvents Detail As GrapeCity.ActiveReports.SectionReportModel.Detail
    Private WithEvents ReportHeader1 As GrapeCity.ActiveReports.SectionReportModel.ReportHeader
    Private WithEvents ReportFooter1 As GrapeCity.ActiveReports.SectionReportModel.ReportFooter
    Private WithEvents PageHeader1 As GrapeCity.ActiveReports.SectionReportModel.PageHeader
    Private WithEvents PageFooter1 As GrapeCity.ActiveReports.SectionReportModel.PageFooter
    Private WithEvents Label1 As GrapeCity.ActiveReports.SectionReportModel.Label
    Private WithEvents GroupHeader1 As GrapeCity.ActiveReports.SectionReportModel.GroupHeader
    Private WithEvents GroupFooter1 As GrapeCity.ActiveReports.SectionReportModel.GroupFooter
    Private WithEvents Line2 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line18 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line19 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line21 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line25 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line29 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line3 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line5 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line7 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line8 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line12 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line17 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line1 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents TXT_estimate_ym As GrapeCity.ActiveReports.SectionReportModel.TextBox
    Private WithEvents TXT_sales_estimate_amt As GrapeCity.ActiveReports.SectionReportModel.TextBox
    Private WithEvents TXT_gross_estimate_amt As GrapeCity.ActiveReports.SectionReportModel.TextBox
    Private WithEvents TXT_percent As GrapeCity.ActiveReports.SectionReportModel.TextBox
    Private WithEvents TBL_month As GrapeCity.ActiveReports.SectionReportModel.TextBox
    Private WithEvents TBL_sales_estimate_amt As GrapeCity.ActiveReports.SectionReportModel.TextBox
    Private WithEvents TBL_gross_estimate_amt As GrapeCity.ActiveReports.SectionReportModel.TextBox
    Private WithEvents TBL_percent As GrapeCity.ActiveReports.SectionReportModel.TextBox
    Private WithEvents TextBox7 As GrapeCity.ActiveReports.SectionReportModel.TextBox
    Private WithEvents TextBox6 As GrapeCity.ActiveReports.SectionReportModel.TextBox
    Private WithEvents TextBox5 As GrapeCity.ActiveReports.SectionReportModel.TextBox
    Private WithEvents LBL_sum As GrapeCity.ActiveReports.SectionReportModel.Label
    Private WithEvents Line32 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line33 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line34 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line9 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line11 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents Line13 As GrapeCity.ActiveReports.SectionReportModel.Line
    Private WithEvents RPT_page As GrapeCity.ActiveReports.SectionReportModel.ReportInfo
    Private WithEvents RPT_date As GrapeCity.ActiveReports.SectionReportModel.ReportInfo
    Private WithEvents TXT_emp_nm As GrapeCity.ActiveReports.SectionReportModel.TextBox
    Private WithEvents LBL_emp_cd As GrapeCity.ActiveReports.SectionReportModel.TextBox
End Class
