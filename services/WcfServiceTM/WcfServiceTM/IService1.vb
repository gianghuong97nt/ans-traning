' NOTE: You can use the "Rename" command on the context menu to change the interface name "IService1" in both code and config file together.
<ServiceContract()>
Public Interface IService1

    <OperationContract()>
    Function GetData(ByVal value As Integer) As String

    <OperationContract()>
    Function GetDataUsingDataContract(ByVal composite As CompositeType) As CompositeType

    ' TODO: Add your service operations here
    '
    <OperationContract()> _
    Function FNC_WEB_PDF(P1 As String(), P2 As String(), P3 As String(), Optional P4 As String = "", Optional P5 As String = "") As String

    <OperationContract()> _
    Function FNC_OUT_EXL(P1 As String(), P2 As String(), P3 As String(), P4 As String, Optional P5 As String = "") As String

    <OperationContract()> _
    Function FNC_OUT_CSV(P1 As String(), P2 As String(), P3 As String(), P4 As String, Optional P5 As String = "") As String

End Interface

' Use a data contract as illustrated in the sample below to add composite types to service operations.

<DataContract()>
Public Class CompositeType

    <DataMember()>
    Public Property BoolValue() As Boolean

    <DataMember()>
    Public Property StringValue() As String

End Class
