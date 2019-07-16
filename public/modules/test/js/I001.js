 var mergearray = checkArrayValue(mergedata);
 var inputarray = checkArrayValue(inputdata);
 var colWidtharray = [];
 var rowHeightarray = [];
 var formatArray = checkArrayValue(formatdata);
 var databasearray = checkArrayValue(databasedata);
 var positionarray = checkArrayValue(positiondata);
 var tablearray = checkArrayValue(tabledata);
 var typeofRenderer = 0;
 var currentTable = 0;
 var hotArray = [];
 var formatArrayTemp=[];
  var selectedCol;
  var currentIndex=0;
 function normalRenderer(instance, td, row, col, prop, value, cellProperties) {
	 Handsontable.renderers.TextRenderer.apply(this, arguments);
	 // td.style.backgroundColor = '#fff';
	 // td.style.color = '#000';
	 //typeofRenderer = 1;
	updateFormatArray(td, row, col, cellProperties,0);
 };
 function blueRenderer(instance, td, row, col, prop, value, cellProperties) {
		 Handsontable.renderers.TextRenderer.apply(this, arguments);
		 td.style.backgroundColor = '#538ed5';
		 td.style.color = '#fff';
		 cellProperties.readOnly = true;
		 updateFormatArray(td, row, col, cellProperties,1);
	 };

	 function blueSkyRenderer(instance, td, row, col, prop, value, cellProperties) {
		 Handsontable.renderers.TextRenderer.apply(this, arguments);
		 td.style.backgroundColor = '#c5d9f1';
		 cellProperties.readOnly = true;
		 //typeofRenderer = 3;
		 updateFormatArray(td, row, col, cellProperties,2);
	 };

	 function yellowRenderer(instance, td, row, col, prop, value, cellProperties) {
		 Handsontable.renderers.TextRenderer.apply(this, arguments);
		 td.style.backgroundColor = '#ffff87';
		 cellProperties.readOnly = true;
		 //typeofRenderer = 1;
		 updateFormatArray(td, row, col, cellProperties,3);
	 };

	 

	 function　 greyRenderer(instance, td, row, col, prop, value, cellProperties) {
		 Handsontable.renderers.TextRenderer.apply(this, arguments);
		 td.style.backgroundColor = '#c0c0c0';
		 cellProperties.readOnly = true;
		 //typeofRenderer = 4;
		 updateFormatArray(td, row, col, cellProperties,4);
	 };

	 function readOnlyRenderer(instance, td, row, col, prop, value, cellProperties) {
	 Handsontable.renderers.TextRenderer.apply(this, arguments);
	 cellProperties.readOnly=true;
	 //typeofRenderer = 1;
		updateFormatArray(td, row, col, cellProperties,5);
 	};
 	function checkboxRenderer(instance, td, row, col, prop, value, cellProperties) {
	 Handsontable.renderers.CheckboxRenderer.apply(this, arguments);
	 //cellProperties.renderer=Handsontable.CheckboxRenderer;
	  cellProperties.type='checkbox';
	 td.style.textAlign = 'center';
		updateFormatArray(td, row, col, cellProperties,6);
 	};
 	
 	function numericRenderer(instance, td, row, col, prop, value, cellProperties) {
	 Handsontable.renderers.NumericRenderer.apply(this, arguments);
	 td.style.textAlign = 'right';
	 cellProperties.type='numeric';
		updateFormatArray(td, row, col, cellProperties,7);
 	};

 	function dateRenderer(instance, td, row, col, prop, value, cellProperties) {
	 Handsontable.renderers.DateRenderer.apply(this, arguments);
	 td.style.textAlign = 'center';
	 cellProperties.type='date';
	 cellProperties.dateFormat='YYYY/MM/DD';
	 //typeofRenderer = 1;
		updateFormatArray(td, row, col, cellProperties,8);
 	};

 $(document).ready(function() {
	 //default row ,col for page
	 var hotArray = new Array();
	 
	 if (tablearray.length == 0) {
		tablearray.push([["日付：",null,"日付：","2017/09/08",null,"2017/09/08","",null,null,null,null,null],["案件：",null,"案件：",null,null,null,null,null,null,null,null,null],["クライアント名：",null,"クライアント名：",null,null,null,null,"顧客名：","顧客名：",null,null,null],["納入場所：",null,"納入場所：",null,null,null,null,"取引方法：","",null,null,null],["納入期日：",null,"納入期日：",null,null,null,null,"見積有効期限：","見積有効期限：",null,null,null]]);
		mergearray.push([{"row":0,"col":0,"rowspan":1,"colspan":3},{"row":1,"col":0,"rowspan":1,"colspan":3},{"row":2,"col":0,"rowspan":1,"colspan":3},{"row":3,"col":0,"rowspan":1,"colspan":3},{"row":4,"col":0,"rowspan":1,"colspan":7},{"row":2,"col":3,"rowspan":1,"colspan":4},{"row":3,"col":3,"rowspan":1,"colspan":4},{"row":4,"col":3,"rowspan":1,"colspan":4},{"row":0,"col":3,"rowspan":1,"colspan":4},{"row":2,"col":7,"rowspan":1,"colspan":2},{"row":3,"col":7,"rowspan":1,"colspan":2},{"row":4,"col":7,"rowspan":1,"colspan":2},{"row":2,"col":9,"rowspan":1,"colspan":3},{"row":3,"col":9,"rowspan":1,"colspan":3},{"row":4,"col":9,"rowspan":1,"colspan":3}])
		
		tablearray.push([["品名 ","品名 ","品名 ","品名 ","品名 ","品名 ","仕上寸法(mm)","仕上寸法(mm)","仕様","仕様","部数"],[null,null,null,null,null,null,null,null,null,null,null]]);
		mergearray.push([{"row":0,"col":0,"rowspan":1,"colspan":6},{"row":1,"col":0,"rowspan":2,"colspan":6},{"row":0,"col":6,"rowspan":1,"colspan":2},{"row":1,"col":6,"rowspan":2,"colspan":2},{"row":0,"col":8,"rowspan":1,"colspan":2},{"row":1,"col":8,"rowspan":2,"colspan":2},{"row":1,"col":10,"rowspan":2,"colspan":1}]);
		
		tablearray.push([[null,null,null,null,null,null,null,null,null,null,null,null,null,"原価単価","利益率","単価",""],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,"原価計","見積金額計","","原価表金額計"],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]);
		mergearray.push([{"row":2,"col":14,"rowspan":1,"colspan":2},{"row":3,"col":14,"rowspan":1,"colspan":2},{"row":0,"col":0,"rowspan":4,"colspan":13},{"row":0,"col":16,"rowspan":2,"colspan":1}]);
		
		tablearray.push([["仕様 ","仕様 ","仕様 ","仕様 ","仕様 ","仕様 ","仕様 ","仕様 ","仕様 ","仕様 ","仕様 ","仕様 ","仕様 ","総合%",null,"%","%"],["内容 ","内容 ","内容 ","内容 ","内容 ","内容 ","内容 ","内容 ","内容 ","内容 ","サイズ","内容 ",null,null,null,null,null],["①",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["②",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["③",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["④",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["⑤","案件","案件","案件","案件","案件","案件","案件","案件","案件",null,null,null,null,null,null,null],["⑥",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]);
		mergearray.push([{"row":0,"col":0,"rowspan":1,"colspan":13},{"row":0,"col":15,"rowspan":1,"colspan":2},{"row":1,"col":13,"rowspan":7,"colspan":4},{"row":1,"col":11,"rowspan":7,"colspan":2},{"row":1,"col":0,"rowspan":1,"colspan":10},{"row":6,"col":1,"rowspan":1,"colspan":9},{"row":2,"col":1,"rowspan":1,"colspan":9},{"row":3,"col":1,"rowspan":1,"colspan":9},{"row":4,"col":1,"rowspan":1,"colspan":9},{"row":5,"col":1,"rowspan":1,"colspan":9},{"row":7,"col":1,"rowspan":1,"colspan":9}]);
		
		tablearray.push([["企画他 ","企画他 ","企画他 ","企画他 ","企画他 ","企画他 ","企画他 ","企画他 ","企画他 ","企画他 ","企画他 ","企画他 ","企画他 ",null,null,null,null],["内容","内容","内容","内容","内容","内容","内容","内容","内容","数量","単価","備考欄",null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]);
		mergearray.push([{"row":0,"col":0,"rowspan":1,"colspan":13},{"row":1,"col":0,"rowspan":1,"colspan":9},{"row":1,"col":11,"rowspan":1,"colspan":2},{"row":2,"col":11,"rowspan":1,"colspan":2},{"row":3,"col":11,"rowspan":1,"colspan":2},{"row":1,"col":13,"rowspan":1,"colspan":4},{"row":2,"col":0,"rowspan":1,"colspan":9},{"row":3,"col":0,"rowspan":1,"colspan":9}]);
	   
		tablearray.push([["製版 ","製版 ","製版 ","製版 ","製版 ","製版 ","製版 ","製版 ","製版 ","製版 ","製版 ","製版 ","製版 ",null,null,null,null],["内容","内容","内容","内容","内容","内容","内容","サイズ","面付","色数","単価","備考欄",null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]);
		mergearray.push([{"row":0,"col":0,"rowspan":1,"colspan":13},{"row":1,"col":13,"rowspan":1,"colspan":4},{"row":1,"col":11,"rowspan":1,"colspan":2},{"row":2,"col":11,"rowspan":1,"colspan":2},{"row":3,"col":11,"rowspan":1,"colspan":2},{"row":4,"col":11,"rowspan":1,"colspan":2},{"row":6,"col":11,"rowspan":1,"colspan":2},{"row":5,"col":11,"rowspan":1,"colspan":2},{"row":1,"col":0,"rowspan":1,"colspan":7},{"row":2,"col":0,"rowspan":1,"colspan":7},{"row":3,"col":0,"rowspan":1,"colspan":7},{"row":4,"col":0,"rowspan":1,"colspan":7},{"row":5,"col":0,"rowspan":1,"colspan":7},{"row":6,"col":0,"rowspan":1,"colspan":7}]);
		
		tablearray.push([["印版","製版 ","製版 ","製版 ","製版 ","製版 ","製版 ","製版 ","製版 ","製版 ","製版 ","製版 ","製版 ",null,null,null,null],["内容","内容","内容","内容","内容","内容","内容","サイズ","面付","色数","単価","備考欄",null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]);
		mergearray.push([{"row":1,"col":13,"rowspan":1,"colspan":4},{"row":1,"col":11,"rowspan":1,"colspan":2},{"row":2,"col":11,"rowspan":1,"colspan":2},{"row":3,"col":11,"rowspan":1,"colspan":2},{"row":4,"col":11,"rowspan":1,"colspan":2},{"row":5,"col":11,"rowspan":1,"colspan":2},{"row":1,"col":0,"rowspan":1,"colspan":7},{"row":2,"col":0,"rowspan":1,"colspan":7},{"row":5,"col":0,"rowspan":1,"colspan":7},{"row":4,"col":0,"rowspan":1,"colspan":7},{"row":3,"col":0,"rowspan":1,"colspan":7},{"row":0,"col":0,"rowspan":1,"colspan":13}]);
		
		tablearray.push([["印刷 ","印刷 ","印刷 ","印刷 ","印刷 ","印刷 ","印刷 ","印刷 ","印刷 ","印刷 ","印刷 ","印刷 ","印刷 ",null,null,null,null],["内容","内容","内容","内容","内容","サイズ","版数","通し数","予備数","台単価","単価","備考欄",null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,"","",null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]);
		mergearray.push([{"row":0,"col":0,"rowspan":1,"colspan":13},{"row":1,"col":13,"rowspan":1,"colspan":4},{"row":1,"col":11,"rowspan":1,"colspan":2},{"row":2,"col":11,"rowspan":1,"colspan":2},{"row":3,"col":11,"rowspan":1,"colspan":2},{"row":4,"col":11,"rowspan":1,"colspan":2},{"row":5,"col":11,"rowspan":1,"colspan":2},{"row":3,"col":0,"rowspan":1,"colspan":5},{"row":1,"col":0,"rowspan":1,"colspan":5},{"row":2,"col":0,"rowspan":1,"colspan":5},{"row":4,"col":0,"rowspan":1,"colspan":5},{"row":5,"col":0,"rowspan":1,"colspan":5}]);
		
		tablearray.push([["表面加工 ","表面加工 ","表面加工 ","表面加工 ","表面加工 ","表面加工 ","表面加工 ","表面加工 ","表面加工 ","表面加工 ","表面加工 ","表面加工 ","表面加工 ",null,null,null,null],["内容","内容","内容","内容","内容","内容","サイズ","通し数","予備数","台単価","単価","備考欄",null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]);
		mergearray.push([{"row":0,"col":0,"rowspan":1,"colspan":13},{"row":1,"col":13,"rowspan":1,"colspan":4},{"row":1,"col":11,"rowspan":1,"colspan":2},{"row":2,"col":11,"rowspan":1,"colspan":2},{"row":3,"col":11,"rowspan":1,"colspan":2},{"row":4,"col":11,"rowspan":1,"colspan":2},{"row":5,"col":11,"rowspan":1,"colspan":2},{"row":2,"col":0,"rowspan":1,"colspan":6},{"row":3,"col":0,"rowspan":1,"colspan":6},{"row":4,"col":0,"rowspan":1,"colspan":6},{"row":5,"col":0,"rowspan":1,"colspan":6},{"row":1,"col":0,"rowspan":1,"colspan":6}]);
		
		tablearray.push([["合紙 ","合紙 ","合紙 ","合紙 ","合紙 ","合紙 ","合紙 ","合紙 ","合紙 ","合紙 ","合紙 ","合紙 ","合紙 ",null,null,null,null],["内容","内容","内容","内容","内容","内容","サイズ","通し数","予備数","台単価","単価","備考欄",null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]);
		mergearray.push([{"row":0,"col":0,"rowspan":1,"colspan":13},{"row":1,"col":13,"rowspan":1,"colspan":4},{"row":1,"col":11,"rowspan":1,"colspan":2},{"row":2,"col":11,"rowspan":1,"colspan":2},{"row":3,"col":11,"rowspan":1,"colspan":2},{"row":4,"col":11,"rowspan":1,"colspan":2},{"row":5,"col":11,"rowspan":1,"colspan":2},{"row":2,"col":0,"rowspan":1,"colspan":6},{"row":3,"col":0,"rowspan":1,"colspan":6},{"row":4,"col":0,"rowspan":1,"colspan":6},{"row":5,"col":0,"rowspan":1,"colspan":6},{"row":1,"col":0,"rowspan":1,"colspan":6}]);
		
		tablearray.push([["抜型","抜型","抜型","抜型","抜型","抜型","抜型","抜型","抜型","抜型","抜型","抜型","抜型",null,null,null,null],["内容","内容","内容","内容","内容","内容","内容","内容","内容","数量","単価","備考欄",null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]);
		mergearray.push([{"row":0,"col":0,"rowspan":1,"colspan":13},{"row":1,"col":11,"rowspan":1,"colspan":2},{"row":2,"col":11,"rowspan":1,"colspan":2},{"row":3,"col":11,"rowspan":1,"colspan":2},{"row":4,"col":11,"rowspan":1,"colspan":2},{"row":5,"col":11,"rowspan":1,"colspan":2},{"row":1,"col":0,"rowspan":1,"colspan":9},{"row":2,"col":0,"rowspan":1,"colspan":9},{"row":3,"col":0,"rowspan":1,"colspan":9},{"row":4,"col":0,"rowspan":1,"colspan":9},{"row":5,"col":0,"rowspan":1,"colspan":9},{"row":1,"col":13,"rowspan":1,"colspan":4}]);
		
		tablearray.push([["抜き・その他 ","抜き・その他 ","抜き・その他 ","抜き・その他 ","抜き・その他 ","抜き・その他 ","抜き・その他 ","抜き・その他 ","抜き・その他 ","抜き・その他 ","抜き・その他 ","抜き・その他 ","抜き・その他 ",null,null,null,null],["内容","内容","内容","内容","内容","内容","サイズ","通し数","予備数","台単価","単価","備考欄",null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]);
		mergearray.push([{"row":0,"col":0,"rowspan":1,"colspan":13},{"row":1,"col":13,"rowspan":1,"colspan":4},{"row":1,"col":11,"rowspan":1,"colspan":2},{"row":2,"col":11,"rowspan":1,"colspan":2},{"row":3,"col":11,"rowspan":1,"colspan":2},{"row":4,"col":11,"rowspan":1,"colspan":2},{"row":5,"col":11,"rowspan":1,"colspan":2},{"row":6,"col":11,"rowspan":1,"colspan":2},{"row":7,"col":11,"rowspan":1,"colspan":2},{"row":1,"col":0,"rowspan":1,"colspan":6},{"row":2,"col":0,"rowspan":1,"colspan":6},{"row":3,"col":0,"rowspan":1,"colspan":6},{"row":4,"col":0,"rowspan":1,"colspan":6},{"row":5,"col":0,"rowspan":1,"colspan":6},{"row":6,"col":0,"rowspan":1,"colspan":6},{"row":7,"col":0,"rowspan":1,"colspan":6}]);
		
		tablearray.push([["セット・その他","セット・その他","セット・その他","セット・その他","セット・その他","セット・その他","セット・その他","セット・その他","セット・その他","セット・その他","セット・その他","セット・その他","セット・その他",null,null,null,null],["内容","内容","内容","内容","内容","内容","内容","内容","内容","数量","単価","備考欄",null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]);
		mergearray.push([{"row":0,"col":0,"rowspan":1,"colspan":13},{"row":1,"col":11,"rowspan":1,"colspan":2},{"row":1,"col":13,"rowspan":1,"colspan":4},{"row":1,"col":0,"rowspan":1,"colspan":9},{"row":2,"col":0,"rowspan":1,"colspan":9},{"row":3,"col":0,"rowspan":1,"colspan":9},{"row":4,"col":0,"rowspan":1,"colspan":9},{"row":6,"col":0,"rowspan":1,"colspan":9},{"row":5,"col":0,"rowspan":1,"colspan":9},{"row":7,"col":0,"rowspan":1,"colspan":9},{"row":8,"col":0,"rowspan":1,"colspan":9},{"row":9,"col":0,"rowspan":1,"colspan":9},{"row":2,"col":11,"rowspan":1,"colspan":2},{"row":3,"col":11,"rowspan":1,"colspan":2},{"row":4,"col":11,"rowspan":1,"colspan":2},{"row":5,"col":11,"rowspan":1,"colspan":2},{"row":6,"col":11,"rowspan":1,"colspan":2},{"row":7,"col":11,"rowspan":1,"colspan":2},{"row":8,"col":11,"rowspan":1,"colspan":2},{"row":9,"col":11,"rowspan":1,"colspan":2}]);
		
		tablearray.push([["内容","内容","内容","内容","内容","内容","内容","内容","内容","数量","単価","備考欄",null,null,null,null,null],["運賃","運賃","運賃","運賃","運賃","運賃","運賃","運賃","運賃",null,null,null,null,null,null,null,null],["営業経費","営業経費","営業経費","営業経費","営業経費","営業経費","営業経費","営業経費","営業経費",null,null,null,null,null,null,null,null],["雑費","雑費","雑費","雑費","雑費","雑費","雑費","雑費","雑費",null,null,null,null,null,null,null,null]]);
		mergearray.push([{"row":0,"col":13,"rowspan":1,"colspan":4},{"row":0,"col":11,"rowspan":1,"colspan":2},{"row":1,"col":11,"rowspan":1,"colspan":2},{"row":2,"col":11,"rowspan":1,"colspan":2},{"row":3,"col":11,"rowspan":1,"colspan":2},{"row":0,"col":0,"rowspan":1,"colspan":9},{"row":1,"col":0,"rowspan":1,"colspan":9},{"row":2,"col":0,"rowspan":1,"colspan":9},{"row":3,"col":0,"rowspan":1,"colspan":9}]);
		 // setDatabasePosition(0,1);
		 // tablearray.push(make2DArray(4, 7));
		 // setDatabasePosition(2,2);
		
	 }
	 if(formatArray.length==0){
		formatArray.push([{row: 0, col: 0, renderer: blueRenderer},{row: 1, col: 0, renderer: blueRenderer,},{row: 2, col: 0, renderer: blueRenderer,},{row: 2, col: 7, renderer: blueRenderer,},{row: 3, col: 0, renderer: blueRenderer},{row: 3, col: 7, renderer: blueRenderer,},{row: 4, col: 0, renderer: blueRenderer,},{row: 4, col: 7, renderer: blueRenderer,},
			{row: 0, col: 3, renderer: dateRenderer},{row: 4, col: 3, renderer: dateRenderer},{row: 4, col: 9, renderer: dateRenderer}]);

		formatArray.push([{row: 0, col: 0, renderer: blueRenderer},{row: 0, col: 6, renderer: blueRenderer},{row: 0, col: 8, renderer: blueRenderer},{row: 0, col: 10, renderer: blueRenderer},
			{row: 1, col: 6, renderer: numericRenderer},{row: 1, col: 10, renderer: numericRenderer}]);

		formatArray.push([{row: 0, col: 13, renderer: blueRenderer},{row: 0, col: 14, renderer: blueRenderer},{row: 0, col: 15, renderer: blueRenderer},{row: 2, col: 13, renderer: blueRenderer},{row: 2, col: 14, renderer: blueRenderer},{row: 2, col: 16, renderer: blueRenderer},{row: 1, col: 13, renderer: yellowRenderer},{row: 1, col: 14, renderer: yellowRenderer},{row: 1, col: 15, renderer: yellowRenderer},{row: 3, col: 13, renderer: yellowRenderer},{row: 3, col: 14, renderer: yellowRenderer},{row: 3, col: 16, renderer: yellowRenderer},]);

		formatArray.push([{row: 0, col: 0, renderer: blueRenderer},{row: 0, col: 13, renderer: blueRenderer},{row: 1, col: 0, renderer: blueSkyRenderer},{row: 1, col: 10, renderer: blueSkyRenderer},{row: 1, col: 11, renderer: greyRenderer},{row: 1, col: 13, renderer: greyRenderer}
			,{row: 0, col: 15, renderer: readOnlyRenderer},{row: 2, col: 10, renderer: numericRenderer},{row: 3, col: 10, renderer: numericRenderer},{row: 4, col: 10, renderer: numericRenderer},{row: 5, col: 10, renderer: numericRenderer},{row: 6, col: 10, renderer: numericRenderer},{row: 7, col: 10, renderer: numericRenderer}]);

		formatArray.push([{row: 0, col: 0, renderer: blueRenderer},{row: 0, col: 13, renderer: yellowRenderer},{row: 1, col: 0, renderer: blueSkyRenderer},{row: 1, col: 11, renderer: blueSkyRenderer},{row: 1, col: 13, renderer: blueSkyRenderer},{row: 1, col: 4, renderer: blueSkyRenderer},{row: 1, col: 5, renderer: blueSkyRenderer},{row: 1, col: 6, renderer: blueSkyRenderer},{row: 1, col: 7, renderer: blueSkyRenderer},{row: 1, col: 8, renderer: blueSkyRenderer},{row: 1, col: 10, renderer: blueSkyRenderer},{row: 1, col: 9, renderer: blueSkyRenderer},{row: 0, col: 14, renderer: yellowRenderer},{row: 0, col: 15, renderer: yellowRenderer},{row: 0, col: 16, renderer: yellowRenderer},{row: 2, col: 14, renderer: yellowRenderer},{row: 2, col: 15, renderer: yellowRenderer},{row: 2, col: 17, renderer: yellowRenderer},{row: 3, col: 14, renderer: yellowRenderer},{row: 3, col: 15, renderer: yellowRenderer},{row: 3, col: 17, renderer: yellowRenderer},{row: 3, col: 13, renderer: yellowRenderer},{row: 2, col: 13, renderer: yellowRenderer},
			{row: 2, col: 16, renderer: checkboxRenderer},{row: 3, col: 16, renderer: checkboxRenderer},{row: 2, col: 9, renderer: numericRenderer},{row: 2, col: 10, renderer: numericRenderer},{row: 3, col: 9, renderer: numericRenderer},{row: 3, col: 10, renderer: numericRenderer}]);

		formatArray.push([{row: 0, col: 0, renderer: blueRenderer},{row: 0, col: 13, renderer: yellowRenderer},{row: 1, col: 0, renderer: blueSkyRenderer},{row: 1, col: 11, renderer: blueSkyRenderer},{row: 1, col: 13, renderer: blueSkyRenderer},{row: 1, col: 4, renderer: blueSkyRenderer},{row: 1, col: 5, renderer: blueSkyRenderer},{row: 1, col: 6, renderer: blueSkyRenderer},{row: 1, col: 7, renderer: blueSkyRenderer},{row: 1, col: 8, renderer: blueSkyRenderer},{row: 1, col: 10, renderer: blueSkyRenderer},{row: 1, col: 9, renderer: blueSkyRenderer},{row: 0, col: 14, renderer: yellowRenderer},{row: 0, col: 15, renderer: yellowRenderer},{row: 0, col: 16, renderer: yellowRenderer},{row: 2, col: 14, renderer: yellowRenderer},{row: 2, col: 15, renderer: yellowRenderer},{row: 2, col: 17, renderer: yellowRenderer},{row: 3, col: 14, renderer: yellowRenderer},{row: 3, col: 15, renderer: yellowRenderer},{row: 3, col: 17, renderer: yellowRenderer},{row: 4, col: 14, renderer: yellowRenderer},{row: 4, col: 15, renderer: yellowRenderer},{row: 4, col: 17, renderer: yellowRenderer},{row: 5, col: 14, renderer: yellowRenderer},{row: 5, col: 15, renderer: yellowRenderer},{row: 5, col: 17, renderer: yellowRenderer},{row: 6, col: 14, renderer: yellowRenderer},{row: 6, col: 15, renderer: yellowRenderer},{row: 6, col: 17, renderer: yellowRenderer},{row: 2, col: 13, renderer: yellowRenderer},{row: 3, col: 13, renderer: yellowRenderer},{row: 4, col: 13, renderer: yellowRenderer},{row: 5, col: 13, renderer: yellowRenderer},{row: 6, col: 13, renderer: yellowRenderer},
			{row: 6, col: 16, renderer: checkboxRenderer},{row: 5, col: 16, renderer: checkboxRenderer},{row: 4, col: 16, renderer: checkboxRenderer},{row: 3, col: 16, renderer: checkboxRenderer},{row: 2, col: 16, renderer: checkboxRenderer},{row: 2, col: 7, renderer: numericRenderer},{row: 3, col: 7, renderer: numericRenderer},{row: 4, col: 7, renderer: numericRenderer},{row: 5, col: 7, renderer: numericRenderer},{row: 6, col: 7, renderer: numericRenderer},{row: 2, col: 8, renderer: numericRenderer},{row: 3, col: 8, renderer: numericRenderer},{row: 4, col: 8, renderer: numericRenderer},{row: 5, col: 8, renderer: numericRenderer},{row: 6, col: 8, renderer: numericRenderer},{row: 2, col: 9, renderer: numericRenderer},{row: 3, col: 9, renderer: numericRenderer},{row: 4, col: 9, renderer: numericRenderer},{row: 5, col: 9, renderer: numericRenderer},{row: 6, col: 9, renderer: numericRenderer},{row: 2, col: 10, renderer: numericRenderer},{row: 3, col: 10, renderer: numericRenderer},{row: 4, col: 10, renderer: numericRenderer},{row: 5, col: 10, renderer: numericRenderer},{row: 6, col: 10, renderer: numericRenderer}]);

		formatArray.push([{row: 0, col: 0, renderer: blueRenderer},{row: 0, col: 13, renderer: yellowRenderer},{row: 1, col: 0, renderer: blueSkyRenderer},{row: 1, col: 11, renderer: blueSkyRenderer},{row: 1, col: 13, renderer: blueSkyRenderer},{row: 1, col: 4, renderer: blueSkyRenderer},{row: 1, col: 5, renderer: blueSkyRenderer},{row: 1, col: 6, renderer: blueSkyRenderer},{row: 1, col: 7, renderer: blueSkyRenderer},{row: 1, col: 8, renderer: blueSkyRenderer},{row: 1, col: 10, renderer: blueSkyRenderer},{row: 1, col: 9, renderer: blueSkyRenderer},{row: 0, col: 14, renderer: yellowRenderer},{row: 0, col: 15, renderer: yellowRenderer},{row: 0, col: 16, renderer: yellowRenderer},{row: 2, col: 14, renderer: yellowRenderer},{row: 2, col: 15, renderer: yellowRenderer},{row: 2, col: 17, renderer: yellowRenderer},{row: 3, col: 14, renderer: yellowRenderer},{row: 3, col: 15, renderer: yellowRenderer},{row: 3, col: 17, renderer: yellowRenderer},{row: 4, col: 14, renderer: yellowRenderer},{row: 4, col: 15, renderer: yellowRenderer},{row: 4, col: 17, renderer: yellowRenderer},{row: 5, col: 14, renderer: yellowRenderer},{row: 5, col: 15, renderer: yellowRenderer},{row: 5, col: 17, renderer: yellowRenderer},{row: 6, col: 14, renderer: yellowRenderer},{row: 6, col: 15, renderer: yellowRenderer},{row: 6, col: 17, renderer: yellowRenderer},{row: 2, col: 13, renderer: yellowRenderer},{row: 3, col: 13, renderer: yellowRenderer},{row: 4, col: 13, renderer: yellowRenderer},{row: 5, col: 13, renderer: yellowRenderer},{row: 6, col: 13, renderer: yellowRenderer},
			{row: 5, col: 16, renderer: checkboxRenderer},{row: 4, col: 16, renderer: checkboxRenderer},{row: 3, col: 16, renderer: checkboxRenderer},{row: 2, col: 16, renderer: checkboxRenderer},{row: 2, col: 7, renderer: numericRenderer},{row: 3, col: 7, renderer: numericRenderer},{row: 4, col: 7, renderer: numericRenderer},{row: 5, col: 7, renderer: numericRenderer},{row: 2, col: 8, renderer: numericRenderer},{row: 3, col: 8, renderer: numericRenderer},{row: 4, col: 8, renderer: numericRenderer},{row: 5, col: 8, renderer: numericRenderer},{row: 2, col: 9, renderer: numericRenderer},{row: 3, col: 9, renderer: numericRenderer},{row: 4, col: 9, renderer: numericRenderer},{row: 5, col: 9, renderer: numericRenderer},{row: 2, col: 10, renderer: numericRenderer},{row: 3, col: 10, renderer: numericRenderer},{row: 4, col: 10, renderer: numericRenderer},{row: 5, col: 10, renderer: numericRenderer}]);

		formatArray.push([{row: 0, col: 0, renderer: blueRenderer},{row: 0, col: 13, renderer: yellowRenderer},{row: 1, col: 0, renderer: blueSkyRenderer},{row: 1, col: 11, renderer: blueSkyRenderer},{row: 1, col: 13, renderer: blueSkyRenderer},{row: 1, col: 4, renderer: blueSkyRenderer},{row: 1, col: 5, renderer: blueSkyRenderer},{row: 1, col: 6, renderer: blueSkyRenderer},{row: 1, col: 7, renderer: blueSkyRenderer},{row: 1, col: 8, renderer: blueSkyRenderer},{row: 1, col: 10, renderer: blueSkyRenderer},{row: 1, col: 9, renderer: blueSkyRenderer},{row: 0, col: 14, renderer: yellowRenderer},{row: 0, col: 15, renderer: yellowRenderer},{row: 0, col: 16, renderer: yellowRenderer},{row: 2, col: 14, renderer: yellowRenderer},{row: 2, col: 15, renderer: yellowRenderer},{row: 2, col: 17, renderer: yellowRenderer},{row: 3, col: 14, renderer: yellowRenderer},{row: 3, col: 15, renderer: yellowRenderer},{row: 3, col: 17, renderer: yellowRenderer},{row: 4, col: 14, renderer: yellowRenderer},{row: 4, col: 15, renderer: yellowRenderer},{row: 4, col: 17, renderer: yellowRenderer},{row: 5, col: 14, renderer: yellowRenderer},{row: 5, col: 15, renderer: yellowRenderer},{row: 5, col: 17, renderer: yellowRenderer},{row: 2, col: 13, renderer: yellowRenderer},{row: 3, col: 13, renderer: yellowRenderer},{row: 4, col: 13, renderer: yellowRenderer},{row: 5, col: 13, renderer: yellowRenderer},{row: 2, col: 0, renderer: yellowRenderer},{row: 2, col: 5, renderer: yellowRenderer},{row: 2, col: 6, renderer: yellowRenderer},{row: 3, col: 0, renderer: yellowRenderer},{row: 3, col: 5, renderer: yellowRenderer},{row: 3, col: 6, renderer: yellowRenderer},{row: 4, col: 0, renderer: yellowRenderer},{row: 4, col: 5, renderer: yellowRenderer},{row: 4, col: 6, renderer: yellowRenderer},{row: 5, col: 0, renderer: yellowRenderer},{row: 5, col: 5, renderer: yellowRenderer},{row: 5, col: 6, renderer: yellowRenderer},
			{row: 5, col: 16, renderer: checkboxRenderer},{row: 4, col: 16, renderer: checkboxRenderer},{row: 3, col: 16, renderer: checkboxRenderer},{row: 2, col: 16, renderer: checkboxRenderer},{row: 2, col: 7, renderer: numericRenderer},{row: 3, col: 7, renderer: numericRenderer},{row: 4, col: 7, renderer: numericRenderer},{row: 5, col: 7, renderer: numericRenderer},{row: 2, col: 8, renderer: numericRenderer},{row: 3, col: 8, renderer: numericRenderer},{row: 4, col: 8, renderer: numericRenderer},{row: 5, col: 8, renderer: numericRenderer},{row: 2, col: 9, renderer: numericRenderer},{row: 3, col: 9, renderer: numericRenderer},{row: 4, col: 9, renderer: numericRenderer},{row: 5, col: 9, renderer: numericRenderer},{row: 2, col: 10, renderer: numericRenderer},{row: 3, col: 10, renderer: numericRenderer},{row: 4, col: 10, renderer: numericRenderer},{row: 5, col: 10, renderer: numericRenderer}]);

		formatArray.push([{row: 0, col: 0, renderer: blueRenderer},{row: 0, col: 13, renderer: yellowRenderer},{row: 1, col: 0, renderer: blueSkyRenderer},{row: 1, col: 11, renderer: blueSkyRenderer},{row: 1, col: 13, renderer: blueSkyRenderer},{row: 1, col: 4, renderer: blueSkyRenderer},{row: 1, col: 5, renderer: blueSkyRenderer},{row: 1, col: 6, renderer: blueSkyRenderer},{row: 1, col: 7, renderer: blueSkyRenderer},{row: 1, col: 8, renderer: blueSkyRenderer},{row: 1, col: 10, renderer: blueSkyRenderer},{row: 1, col: 9, renderer: blueSkyRenderer},{row: 0, col: 14, renderer: yellowRenderer},{row: 0, col: 15, renderer: yellowRenderer},{row: 0, col: 16, renderer: yellowRenderer},{row: 2, col: 14, renderer: yellowRenderer},{row: 2, col: 15, renderer: yellowRenderer},{row: 2, col: 17, renderer: yellowRenderer},{row: 3, col: 14, renderer: yellowRenderer},{row: 3, col: 15, renderer: yellowRenderer},{row: 3, col: 17, renderer: yellowRenderer},{row: 4, col: 14, renderer: yellowRenderer},{row: 4, col: 15, renderer: yellowRenderer},{row: 4, col: 17, renderer: yellowRenderer},{row: 5, col: 14, renderer: yellowRenderer},{row: 5, col: 15, renderer: yellowRenderer},{row: 5, col: 17, renderer: yellowRenderer},{row: 6, col: 14, renderer: yellowRenderer},{row: 6, col: 15, renderer: yellowRenderer},{row: 6, col: 17, renderer: yellowRenderer},{row: 7, col: 14, renderer: yellowRenderer},{row: 7, col: 15, renderer: yellowRenderer},{row: 7, col: 17, renderer: yellowRenderer},{row: 8, col: 14, renderer: yellowRenderer},{row: 8, col: 15, renderer: yellowRenderer},{row: 8, col: 17, renderer: yellowRenderer},{row: 9, col: 14, renderer: yellowRenderer},{row: 9, col: 15, renderer: yellowRenderer},{row: 9, col: 17, renderer: yellowRenderer},{row: 2, col: 6, renderer: yellowRenderer},{row: 2, col: 7, renderer: yellowRenderer},{row: 3, col: 6, renderer: yellowRenderer},{row: 3, col: 7, renderer: yellowRenderer},{row: 4, col: 6, renderer: yellowRenderer},{row: 4, col: 7, renderer: yellowRenderer},{row: 5, col: 6, renderer: yellowRenderer},{row: 5, col: 7, renderer: yellowRenderer},{row: 2, col: 9, renderer: yellowRenderer},{row: 3, col: 9, renderer: yellowRenderer},{row: 4, col: 9, renderer: yellowRenderer},{row: 5, col: 9, renderer: yellowRenderer},{row: 6, col: 9, renderer: yellowRenderer},{row: 7, col: 9, renderer: yellowRenderer},{row: 8, col: 9, renderer: yellowRenderer},{row: 9, col: 9, renderer: yellowRenderer},{row: 2, col: 13, renderer: yellowRenderer},{row: 3, col: 13, renderer: yellowRenderer},{row: 4, col: 13, renderer: yellowRenderer},{row: 5, col: 13, renderer: yellowRenderer},{row: 6, col: 13, renderer: yellowRenderer},{row: 7, col: 13, renderer: yellowRenderer},{row: 8, col: 13, renderer: yellowRenderer},{row: 9, col: 13, renderer: yellowRenderer},
			{row: 9, col: 16, renderer: checkboxRenderer},{row: 8, col: 16, renderer: checkboxRenderer},{row: 7, col: 16, renderer: checkboxRenderer},{row: 6, col: 16, renderer: checkboxRenderer},{row: 5, col: 16, renderer: checkboxRenderer},{row: 4, col: 16, renderer: checkboxRenderer},{row: 3, col: 16, renderer: checkboxRenderer},{row: 2, col: 16, renderer: checkboxRenderer},{row: 2, col: 4, renderer: numericRenderer},{row: 3, col: 4, renderer: numericRenderer},{row: 4, col: 4, renderer: numericRenderer},{row: 5, col: 4, renderer: numericRenderer},{row: 6, col: 4, renderer: numericRenderer},{row: 7, col: 4, renderer: numericRenderer},{row: 8, col: 4, renderer: numericRenderer},{row: 9, col: 4, renderer: numericRenderer},{row: 2, col: 5, renderer: numericRenderer},{row: 3, col: 5, renderer: numericRenderer},{row: 4, col: 5, renderer: numericRenderer},{row: 5, col: 5, renderer: numericRenderer},{row: 6, col: 5, renderer: numericRenderer},{row: 7, col: 5, renderer: numericRenderer},{row: 8, col: 5, renderer: numericRenderer},{row: 9, col: 5, renderer: numericRenderer},{row: 6, col: 6, renderer: numericRenderer},{row: 7, col: 6, renderer: numericRenderer},{row: 8, col: 6, renderer: numericRenderer},{row: 9, col: 6, renderer: numericRenderer},{row: 6, col: 7, renderer: numericRenderer},{row: 7, col: 7, renderer: numericRenderer},{row: 8, col: 7, renderer: numericRenderer},{row: 9, col: 7, renderer: numericRenderer},{row: 2, col: 8, renderer: numericRenderer},{row: 3, col: 8, renderer: numericRenderer},{row: 4, col: 8, renderer: numericRenderer},{row: 5, col: 8, renderer: numericRenderer},{row: 6, col: 8, renderer: numericRenderer},{row: 7, col: 8, renderer: numericRenderer},{row: 8, col: 8, renderer: numericRenderer},{row: 9, col: 8, renderer: numericRenderer},{row: 2, col: 10, renderer: numericRenderer},{row: 3, col: 10, renderer: numericRenderer},{row: 4, col: 10, renderer: numericRenderer},{row: 5, col: 10, renderer: numericRenderer},{row: 6, col: 10, renderer: numericRenderer},{row: 7, col: 10, renderer: numericRenderer},{row: 8, col: 10, renderer: numericRenderer},{row: 9, col: 10, renderer: numericRenderer}]);

		formatArray.push([{row: 0, col: 0, renderer: blueRenderer},{row: 0, col: 13, renderer: yellowRenderer},{row: 1, col: 0, renderer: blueSkyRenderer},{row: 1, col: 11, renderer: blueSkyRenderer},{row: 1, col: 13, renderer: blueSkyRenderer},{row: 1, col: 4, renderer: blueSkyRenderer},{row: 1, col: 5, renderer: blueSkyRenderer},{row: 1, col: 6, renderer: blueSkyRenderer},{row: 1, col: 7, renderer: blueSkyRenderer},{row: 1, col: 8, renderer: blueSkyRenderer},{row: 1, col: 10, renderer: blueSkyRenderer},{row: 1, col: 9, renderer: blueSkyRenderer},{row: 0, col: 14, renderer: yellowRenderer},{row: 0, col: 15, renderer: yellowRenderer},{row: 0, col: 16, renderer: yellowRenderer},{row: 2, col: 14, renderer: yellowRenderer},{row: 2, col: 15, renderer: yellowRenderer},{row: 2, col: 17, renderer: yellowRenderer},{row: 3, col: 14, renderer: yellowRenderer},{row: 3, col: 15, renderer: yellowRenderer},{row: 3, col: 17, renderer: yellowRenderer},{row: 4, col: 14, renderer: yellowRenderer},{row: 4, col: 15, renderer: yellowRenderer},{row: 4, col: 17, renderer: yellowRenderer},{row: 5, col: 14, renderer: yellowRenderer},{row: 5, col: 15, renderer: yellowRenderer},{row: 5, col: 17, renderer: yellowRenderer},{row: 2, col: 6, renderer: yellowRenderer},{row: 3, col: 6, renderer: yellowRenderer},{row: 4, col: 6, renderer: yellowRenderer},{row: 5, col: 6, renderer: yellowRenderer},{row: 2, col: 13, renderer: yellowRenderer},{row: 3, col: 13, renderer: yellowRenderer},{row: 4, col: 13, renderer: yellowRenderer},{row: 5, col: 13, renderer: yellowRenderer},
			{row: 5, col: 16, renderer: checkboxRenderer},{row: 4, col: 16, renderer: checkboxRenderer},{row: 3, col: 16, renderer: checkboxRenderer},{row: 2, col: 16, renderer: checkboxRenderer},{row: 2, col: 7, renderer: numericRenderer},{row: 3, col: 7, renderer: numericRenderer},{row: 4, col: 7, renderer: numericRenderer},{row: 5, col: 7, renderer: numericRenderer},{row: 2, col: 8, renderer: numericRenderer},{row: 3, col: 8, renderer: numericRenderer},{row: 4, col: 8, renderer: numericRenderer},{row: 5, col: 8, renderer: numericRenderer},{row: 2, col: 9, renderer: numericRenderer},{row: 3, col: 9, renderer: numericRenderer},{row: 4, col: 9, renderer: numericRenderer},{row: 5, col: 9, renderer: numericRenderer},{row: 2, col: 10, renderer: numericRenderer},{row: 3, col: 10, renderer: numericRenderer},{row: 4, col: 10, renderer: numericRenderer},{row: 5, col: 10, renderer: numericRenderer}]);

		formatArray.push([{row: 0, col: 0, renderer: blueRenderer},{row: 0, col: 13, renderer: yellowRenderer},{row: 1, col: 0, renderer: blueSkyRenderer},{row: 1, col: 11, renderer: blueSkyRenderer},{row: 1, col: 13, renderer: blueSkyRenderer},{row: 1, col: 4, renderer: blueSkyRenderer},{row: 1, col: 5, renderer: blueSkyRenderer},{row: 1, col: 6, renderer: blueSkyRenderer},{row: 1, col: 7, renderer: blueSkyRenderer},{row: 1, col: 8, renderer: blueSkyRenderer},{row: 1, col: 10, renderer: blueSkyRenderer},{row: 1, col: 9, renderer: blueSkyRenderer},{row: 0, col: 14, renderer: yellowRenderer},{row: 0, col: 15, renderer: yellowRenderer},{row: 0, col: 16, renderer: yellowRenderer},{row: 2, col: 14, renderer: yellowRenderer},{row: 2, col: 15, renderer: yellowRenderer},{row: 2, col: 17, renderer: yellowRenderer},{row: 3, col: 14, renderer: yellowRenderer},{row: 3, col: 15, renderer: yellowRenderer},{row: 3, col: 17, renderer: yellowRenderer},{row: 4, col: 14, renderer: yellowRenderer},{row: 4, col: 15, renderer: yellowRenderer},{row: 4, col: 17, renderer: yellowRenderer},{row: 5, col: 14, renderer: yellowRenderer},{row: 5, col: 15, renderer: yellowRenderer},{row: 5, col: 17, renderer: yellowRenderer},{row: 2, col: 6, renderer: yellowRenderer},{row: 3, col: 6, renderer: yellowRenderer},{row: 4, col: 6, renderer: yellowRenderer},{row: 5, col: 6, renderer: yellowRenderer},{row: 2, col: 13, renderer: yellowRenderer},{row: 3, col: 13, renderer: yellowRenderer},{row: 4, col: 13, renderer: yellowRenderer},{row: 5, col: 13, renderer: yellowRenderer}
			,{row: 5, col: 16, renderer: checkboxRenderer},{row: 4, col: 16, renderer: checkboxRenderer},{row: 3, col: 16, renderer: checkboxRenderer},{row: 2, col: 16, renderer: checkboxRenderer},{row: 2, col: 7, renderer: numericRenderer},{row: 3, col: 7, renderer: numericRenderer},{row: 4, col: 7, renderer: numericRenderer},{row: 5, col: 7, renderer: numericRenderer},{row: 2, col: 8, renderer: numericRenderer},{row: 3, col: 8, renderer: numericRenderer},{row: 4, col: 8, renderer: numericRenderer},{row: 5, col: 8, renderer: numericRenderer},{row: 2, col: 9, renderer: numericRenderer},{row: 3, col: 9, renderer: numericRenderer},{row: 4, col: 9, renderer: numericRenderer},{row: 5, col: 9, renderer: numericRenderer},{row: 2, col: 10, renderer: numericRenderer},{row: 3, col: 10, renderer: numericRenderer},{row: 4, col: 10, renderer: numericRenderer},{row: 5, col: 10, renderer: numericRenderer}]);


		formatArray.push([{row: 0, col: 0, renderer: blueRenderer},{row: 0, col: 13, renderer: yellowRenderer},{row: 1, col: 0, renderer: blueSkyRenderer},{row: 1, col: 11, renderer: blueSkyRenderer},{row: 1, col: 13, renderer: blueSkyRenderer},{row: 1, col: 4, renderer: blueSkyRenderer},{row: 1, col: 5, renderer: blueSkyRenderer},{row: 1, col: 6, renderer: blueSkyRenderer},{row: 1, col: 7, renderer: blueSkyRenderer},{row: 1, col: 8, renderer: blueSkyRenderer},{row: 1, col: 10, renderer: blueSkyRenderer},{row: 1, col: 9, renderer: blueSkyRenderer},{row: 0, col: 14, renderer: yellowRenderer},{row: 0, col: 15, renderer: yellowRenderer},{row: 0, col: 16, renderer: yellowRenderer},{row: 2, col: 14, renderer: yellowRenderer},{row: 2, col: 15, renderer: yellowRenderer},{row: 2, col: 17, renderer: yellowRenderer},{row: 3, col: 14, renderer: yellowRenderer},{row: 3, col: 15, renderer: yellowRenderer},{row: 3, col: 17, renderer: yellowRenderer},{row: 4, col: 14, renderer: yellowRenderer},{row: 4, col: 15, renderer: yellowRenderer},{row: 4, col: 17, renderer: yellowRenderer},{row: 5, col: 14, renderer: yellowRenderer},{row: 5, col: 15, renderer: yellowRenderer},{row: 5, col: 17, renderer: yellowRenderer},{row: 2, col: 6, renderer: yellowRenderer},{row: 3, col: 6, renderer: yellowRenderer},{row: 4, col: 6, renderer: yellowRenderer},{row: 5, col: 6, renderer: yellowRenderer},{row:2, col: 13, renderer: yellowRenderer},{row: 3, col: 13, renderer: yellowRenderer},{row: 4, col: 13, renderer: yellowRenderer},{row: 5, col: 13, renderer: yellowRenderer},
			{row: 5, col: 16, renderer: checkboxRenderer},{row: 4, col: 16, renderer: checkboxRenderer},{row: 3, col: 16, renderer: checkboxRenderer},{row: 2, col: 16, renderer: checkboxRenderer},{row: 2, col: 9, renderer: numericRenderer},{row: 3, col: 9, renderer: numericRenderer},{row: 4, col: 9, renderer: numericRenderer},{row: 5, col: 9, renderer: numericRenderer},{row: 2, col: 10, renderer: numericRenderer},{row: 3, col: 10, renderer: numericRenderer},{row: 4, col: 10, renderer: numericRenderer},{row: 5, col: 10, renderer: numericRenderer}]);


		formatArray.push([{row: 0, col: 0, renderer: blueRenderer},{row: 0, col: 13, renderer: yellowRenderer},{row: 1, col: 0, renderer: blueSkyRenderer},{row: 1, col: 11, renderer: blueSkyRenderer},{row: 1, col: 13, renderer: blueSkyRenderer},{row: 1, col: 4, renderer: blueSkyRenderer},{row: 1, col: 5, renderer: blueSkyRenderer},{row: 1, col: 6, renderer: blueSkyRenderer},{row: 1, col: 7, renderer: blueSkyRenderer},{row: 1, col: 8, renderer: blueSkyRenderer},{row: 1, col: 10, renderer: blueSkyRenderer},{row: 1, col: 9, renderer: blueSkyRenderer},{row: 0, col: 14, renderer: yellowRenderer},{row: 0, col: 15, renderer: yellowRenderer},{row: 0, col: 16, renderer: yellowRenderer},{row: 2, col: 14, renderer: yellowRenderer},{row: 2, col: 15, renderer: yellowRenderer},{row: 2, col: 17, renderer: yellowRenderer},{row: 3, col: 14, renderer: yellowRenderer},{row: 3, col: 15, renderer: yellowRenderer},{row: 3, col: 17, renderer: yellowRenderer},{row: 4, col: 14, renderer: yellowRenderer},{row: 4, col: 15, renderer: yellowRenderer},{row: 4, col: 17, renderer: yellowRenderer},{row: 5, col: 14, renderer: yellowRenderer},{row: 5, col: 15, renderer: yellowRenderer},{row: 5, col: 17, renderer: yellowRenderer},{row: 6, col: 14, renderer: yellowRenderer},{row: 6, col: 15, renderer: yellowRenderer},{row: 6, col: 17, renderer: yellowRenderer},{row: 7, col: 14, renderer: yellowRenderer},{row: 7, col: 15, renderer: yellowRenderer},{row: 7, col: 17, renderer: yellowRenderer},{row: 2, col: 6, renderer: yellowRenderer},{row: 3, col: 6, renderer: yellowRenderer},{row: 4, col: 6, renderer: yellowRenderer},{row: 5, col: 6, renderer: yellowRenderer},{row: 6, col: 6, renderer: yellowRenderer},{row: 7, col: 6, renderer: yellowRenderer},{row: 2, col: 13, renderer: yellowRenderer},{row: 5, col: 13, renderer: yellowRenderer},{row:4, col: 13, renderer: yellowRenderer},{row: 3, col: 13, renderer: yellowRenderer},{row: 6, col: 13, renderer: yellowRenderer},{row: 7, col: 13, renderer: yellowRenderer}
			,{row: 7, col: 16, renderer: checkboxRenderer},{row: 6, col: 16, renderer: checkboxRenderer},{row: 5, col: 16, renderer: checkboxRenderer},{row: 4, col: 16, renderer: checkboxRenderer},{row: 3, col: 16, renderer: checkboxRenderer},{row: 2, col: 16, renderer: checkboxRenderer},{row: 2, col: 7, renderer: numericRenderer},{row: 3, col: 7, renderer: numericRenderer},{row: 4, col: 7, renderer: numericRenderer},{row: 5, col: 7, renderer: numericRenderer},{row: 6, col: 7, renderer: numericRenderer},{row: 2, col: 8, renderer: numericRenderer},{row: 3, col: 8, renderer: numericRenderer},{row: 4, col: 8, renderer: numericRenderer},{row: 5, col: 8, renderer: numericRenderer},{row: 6, col: 8, renderer: numericRenderer},{row: 2, col: 9, renderer: numericRenderer},{row: 3, col: 9, renderer: numericRenderer},{row: 4, col: 9, renderer: numericRenderer},{row: 5, col: 9, renderer: numericRenderer},{row: 6, col: 9, renderer: numericRenderer},{row: 2, col: 10, renderer: numericRenderer},{row: 3, col: 10, renderer: numericRenderer},{row: 4, col: 10, renderer: numericRenderer},{row: 5, col: 10, renderer: numericRenderer},{row: 6, col: 10, renderer: numericRenderer},{row: 7, col: 7, renderer: numericRenderer},{row: 7, col: 8, renderer: numericRenderer},{row: 7, col: 9, renderer: numericRenderer},{row: 7, col: 10, renderer: numericRenderer}]);


		formatArray.push([{row: 0, col: 0, renderer: blueRenderer},{row: 0, col: 13, renderer: yellowRenderer},{row: 1, col: 0, renderer: blueSkyRenderer},{row: 1, col: 11, renderer: blueSkyRenderer},{row: 1, col: 13, renderer: blueSkyRenderer},{row: 1, col: 4, renderer: blueSkyRenderer},{row: 1, col: 5, renderer: blueSkyRenderer},{row: 1, col: 6, renderer: blueSkyRenderer},{row: 1, col: 7, renderer: blueSkyRenderer},{row: 1, col: 8, renderer: blueSkyRenderer},{row: 1, col: 10, renderer: blueSkyRenderer},{row: 1, col: 9, renderer: blueSkyRenderer},{row: 0, col: 14, renderer: yellowRenderer},{row: 0, col: 15, renderer: yellowRenderer},{row: 0, col: 16, renderer: yellowRenderer},{row: 2, col: 14, renderer: yellowRenderer},{row: 2, col: 15, renderer: yellowRenderer},{row: 2, col: 17, renderer: yellowRenderer},{row: 3, col: 14, renderer: yellowRenderer},{row: 3, col: 15, renderer: yellowRenderer},{row: 3, col: 17, renderer: yellowRenderer},{row: 4, col: 14, renderer: yellowRenderer},{row: 4, col: 15, renderer: yellowRenderer},{row: 4, col: 17, renderer: yellowRenderer},{row: 5, col: 14, renderer: yellowRenderer},{row: 5, col: 15, renderer: yellowRenderer},{row: 5, col: 17, renderer: yellowRenderer},{row: 6, col: 14, renderer: yellowRenderer},{row: 6, col: 15, renderer: yellowRenderer},{row: 6, col: 17, renderer: yellowRenderer},{row: 7, col: 14, renderer: yellowRenderer},{row: 7, col: 15, renderer: yellowRenderer},{row: 7, col: 17, renderer: yellowRenderer},{row: 8, col: 14, renderer: yellowRenderer},{row: 8, col: 15, renderer: yellowRenderer},{row: 8, col: 17, renderer: yellowRenderer},{row: 9, col: 14, renderer: yellowRenderer},{row: 9, col: 15, renderer: yellowRenderer},{row: 9, col: 17, renderer: yellowRenderer},{row: 2, col: 13, renderer: yellowRenderer},{row: 3, col: 13, renderer: yellowRenderer},{row: 4, col: 13, renderer: yellowRenderer},{row: 5, col: 13, renderer: yellowRenderer},{row: 6, col: 13, renderer: yellowRenderer},{row: 7, col: 13, renderer: yellowRenderer},{row: 8, col: 13, renderer: yellowRenderer},{row: 9, col: 13, renderer: yellowRenderer}
			,{row: 9, col: 16, renderer: checkboxRenderer},{row: 8, col: 16, renderer: checkboxRenderer},{row: 7, col: 16, renderer: checkboxRenderer},{row: 6, col: 16, renderer: checkboxRenderer},{row: 5, col: 16, renderer: checkboxRenderer},{row: 4, col: 16, renderer: checkboxRenderer},{row: 3, col: 16, renderer: checkboxRenderer},{row: 2, col: 16, renderer: checkboxRenderer},{row: 6, col: 9, renderer: numericRenderer},{row: 7, col: 9, renderer: numericRenderer},{row: 8, col: 9, renderer: numericRenderer},{row: 9, col: 9, renderer: numericRenderer},{row: 6, col: 10, renderer: numericRenderer},{row: 7, col: 10, renderer: numericRenderer},{row: 8, col: 10, renderer: numericRenderer},{row: 9, col: 10, renderer: numericRenderer} ,{row: 2, col: 9, renderer: numericRenderer},{row: 3, col: 9, renderer: numericRenderer},{row: 4, col: 9, renderer: numericRenderer},{row: 5, col: 9, renderer: numericRenderer},{row: 2, col: 10, renderer: numericRenderer},{row: 3, col: 10, renderer: numericRenderer},{row: 4, col: 10, renderer: numericRenderer},{row: 5, col: 10, renderer: numericRenderer}]);

		formatArray.push([{row: 0, col: 0, renderer: blueSkyRenderer},{row: 0, col: 11, renderer: blueSkyRenderer},{row: 0, col: 13, renderer: blueSkyRenderer},{row: 0, col: 4, renderer: blueSkyRenderer},{row: 0, col: 5, renderer: blueSkyRenderer},{row: 0, col: 6, renderer: blueSkyRenderer},{row: 0, col: 7, renderer: blueSkyRenderer},{row: 0, col: 8, renderer: blueSkyRenderer},{row: 0, col: 10, renderer: blueSkyRenderer},{row: 0, col: 9, renderer: blueSkyRenderer},{row: 0, col: 14, renderer: blueSkyRenderer},{row: 0, col: 15, renderer: blueSkyRenderer},{row: 0, col: 16, renderer: blueSkyRenderer},{row: 1, col: 13, renderer: yellowRenderer},{row: 1, col: 14, renderer: yellowRenderer},{row: 1, col: 15, renderer: yellowRenderer},{row: 1, col: 17, renderer: yellowRenderer},{row: 3, col: 13, renderer: yellowRenderer},{row: 3, col: 14, renderer: yellowRenderer},{row: 3, col: 15, renderer: yellowRenderer},{row: 3, col: 17, renderer: yellowRenderer},{row: 2, col: 13, renderer: yellowRenderer},{row: 2, col: 14, renderer: yellowRenderer},{row: 2, col: 15, renderer: yellowRenderer},{row: 2, col: 17, renderer: yellowRenderer}
			,{row: 1, col: 0, renderer: readOnlyRenderer},{row: 2, col: 0, renderer: readOnlyRenderer},{row: 3, col: 0, renderer: readOnlyRenderer},{row: 3, col: 16, renderer: checkboxRenderer},{row: 2, col: 16, renderer: checkboxRenderer},{row: 1, col: 16, renderer: checkboxRenderer},{row: 2, col: 9, renderer: numericRenderer},{row: 3, col: 9, renderer: numericRenderer},{row: 1, col: 9, renderer: numericRenderer},{row: 2, col: 10, renderer: numericRenderer},{row: 3, col: 10, renderer: numericRenderer},{row: 1, col: 10, renderer: numericRenderer}]);
	 }
	 //default position for database
	 //set database into position
	 // for (var temp = 0; temp < databasearray.length; temp++) {
	 //     for (var i = 0; i < databasearray[temp].length; i++){
	 //        tablearray[temp][i] = databasearray[temp][i];
	 //     } 
	 // }
	 //convertFormat();
	 formatArrayTemp=formatArray;
	 covertData();
	 convertInt();
	 convertFormat();
	 for (var i = 0; i < tablearray.length; i++) {
		 var hotElement = document.querySelector('#hot' + i);
		 var hotElementContainer = hotElement.parentNode;
		 var hotSettings = {
			 data: tablearray[i],
			 mergeCells: mergearray[i],
			 stretchH: 'all',
			 contextMenu: false,
			 autoWrapRow: true,
			 colWidths: colWidtharray,
			 rowHeights: rowHeightarray,
			 cell: formatArray[i],
			 afterChange: function() {
				 for (var i = 0; i < tablearray.length; i++) {
					 $('#hot' + i).find('.wtHider').css('height', $('#hot' + i).find('.wtSpreader').height() - 1);
					 $('#hot' + i).find('table').css('width', $('#hot0').find('table').width());
				 }
				 setCollapse();
			 },
			 beforeKeyDown: function(e) {
				 currentIndex = jQuery.inArray(this, hotArray);
				 switch (e.keyCode) {
					 case 38:
						 if (this.getSelected()[0] == 0) {
							 this.deselectCell();
							 hotArray[currentIndex - 1].selectCell(hotArray[currentIndex - 1].countRows() - 1, selectedCol, hotArray[currentIndex - 1].countRows() - 1, selectedCol);
						 }

						 break;
					 case 40:
						 if (this.getSelected()[2] == this.countRows() - 1) {
							 this.deselectCell();
							 hotArray[currentIndex + 1].selectCell(0, selectedCol, 0, selectedCol);
							 e.stopImmediatePropagation();
						 }else{
						 	this.selectCell(this.getSelected()[0]+1, selectedCol, this.getSelected()[0]+1, selectedCol,true);
						 	e.stopImmediatePropagation();
						 }
						 break;
				 }
				  //console.log(selectedCol);
				 //alert(this.getSelected());
			 },
			 afterSelection: function(row) {
				 var temp = $(this.view.wt.wtOverlays.topOverlay.clone.wtTable.holder.parentNode).parent().attr('id');
				 $("#add-btn").prop("disabled", false);
				 //$("#add-btn").text('ADD NEW ROW INTO TABLE ' + temp.split('hot')[1]);
				 currentTable = Number(temp.split('hot')[1]);
				 if(this.getSelected()[1]==this.getSelected()[3]||this.getSelected()[0]>1){
				 	
				 	selectedCol = this.getSelected()[1];
				 	console.log(selectedCol);
				 }
					
				 
			 
			 },
			 afterRenderer: function(td, row, col, prop, value, cellProperties) {
				 if (cellProperties.renderer) {
					 if (td.style.backgroundColor) {
						 //cellProperties.readOnly = true;
						
						td.style.textAlign = 'center';
						
					 }
				 }
				 
			 },
		 }
		 var hot = new Handsontable(instance = hotElement, hotSettings);
		 hotArray[i] = hot;
	 }
	 for (var i = 0; i < tablearray.length; i++) {
		 hotArray[i].updateSettings({
			 colWidths: colWidtharray,
			 rowHeights: rowHeightarray,
			 contextMenu: {
				 callback: function(key, options) {
					 if (key === 'about') {
						 setTimeout(function() {
							 // timeout is used to make sure the menu collapsed before alert is shown
							 alert("This is a context menu with default and custom options mixed");
						 }, 100);
					 }
				 },
				 items: {
					 "ColorMenu": {
						 key: "submenu",
						 name: "Cell Color",
						 "submenu": {
							 "items": [{
								 key: "submenu:1",
								 "name": "Blue",
								 callback: function callback() {
									 var _this2 = this;
									 var range = this.getSelectedRange();
									 range.forAll(function(row, col) {
										 _this2.setCellMeta(row, col, 'renderer', blueRenderer);
									 });
									 this.render();
									 //formatArrayTemp[i]['renderer']=1;
								 },
							 }, {
								 key: "submenu:2",
								 "name": "BlueSky",
								 callback: function callback() {
									 var _this2 = this;
									 var range = this.getSelectedRange();
									 range.forAll(function(row, col) {
										 _this2.setCellMeta(row, col, 'renderer', blueSkyRenderer);
									 });
									 this.render();
									 //formatArrayTemp[i]['renderer']=2;
								 },
							 }, {
								 key: "submenu:3",
								 "name": "Grey",
								 callback: function callback() {
									 var _this2 = this;
									 var range = this.getSelectedRange();
									 range.forAll(function(row, col) {
										 _this2.setCellMeta(row, col, 'renderer', greyRenderer);
									 });
									 this.render();
									 //formatArrayTemp[i]['renderer']=3;
								 },
							 }, {
								 key: "submenu:4",
								 "name": "Yellow",
								 callback: function callback() {
									 var _this2 = this;
									 var range = this.getSelectedRange();
									 range.forAll(function(row, col) {
										 _this2.setCellMeta(row, col, 'renderer', yellowRenderer);
									 });
									 this.render();
									 //formatArrayTemp[i]['renderer']=4;
								 },
							 },{
								 key: "submenu:5",
								 "name": "normal",
								 callback: function callback() {
									 var _this2 = this;
									 var range = this.getSelectedRange();
									 range.forAll(function(row, col) {
										 _this2.setCellMeta(row, col, 'renderer', normalRenderer);
									 });
									 this.render();
									 //formatArrayTemp[i]['renderer']=4;
								 },
							 }, ]
						 }
					 },
					 "TypeMenu": {
                         key: "subtypemenu",
                         name: "Cell Type",
                         "submenu": {
                             "items": [{
                                 key: "subtypemenu:1",
                                 "name": "Checkbox",
                                 callback: function callback() {
                                     var _this2 = this;
                                     var range = this.getSelectedRange();
                                     range.forAll(function(row, col) {
                                        _this2.setCellMeta(row, col, 'renderer', checkboxRenderer);
                                     });
                                     this.render();
                                     //formatArrayTemp[i]['renderer']=1;
                                 },
                             }, {
                                 key: "subtypemenu:2",
                                 "name": "date",
                                 callback: function callback() {
                                     var _this2 = this;
                                     var range = this.getSelectedRange();
                                     range.forAll(function(row, col) {
                                         _this2.setCellMeta(row, col, 'renderer', dateRenderer);
                                     });
                                     this.render();
                                     //formatArrayTemp[i]['renderer']=2;
                                 },
                             }, {
                                 key: "subtypemenu:3",
                                 "name": "numeric",
                                 callback: function callback() {
                                     var _this2 = this;
                                     var range = this.getSelectedRange();
                                     range.forAll(function(row, col) {
                                         _this2.setCellMeta(row, col, 'renderer', numericRenderer);
                                     });
                                     this.render();
                                     //formatArrayTemp[i]['renderer']=3;
                                 },
                             },{
                                 key: "subtypemenu:4",
                                 "name": "readOnly",
                                 callback: function callback() {
                                     var _this2 = this;
                                     var range = this.getSelectedRange();
                                     range.forAll(function(row, col) {
                                         _this2.setCellMeta(row, col, 'renderer', readOnlyRenderer);
                                     });
                                     this.render();
                                     //formatArrayTemp[i]['renderer']=4;
                                 },
                             },
                             {
                                 key: "subtypemenu:5",
                                 "name": "normal",
                                 callback: function callback() {
                                     var _this2 = this;
                                     var range = this.getSelectedRange();
                                     range.forAll(function(row, col) {
                                         _this2.setCellMeta(row, col, 'renderer', normalRenderer);
                                     });
                                     this.render();
                                     //formatArrayTemp[i]['renderer']=4;
                                 },
                             },
                             ]
                         }
                     },
                     "mergeCells": {},
                     "row_below": {},
                     "remove_row": {
                         name: 'Remove this row',
                     },
				 }
			 }
		 })
		 $('#hot' + i).find('.wtHider').css('height', $('#hot' + i).find('.wtSpreader').height() - 1);
	 }
	 $("#save-btn").on('click', function() {
		 for (var i = 0; i < tablearray.length; i++) {
			 tablearray[i] = hotArray[i].getData();
			 mergearray[i] = hotArray[i].mergeCells.mergedCellInfoCollection;
		 }
		 var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
		 $.ajax({
			 /* the route pointing to the post function */
			 url: '/test/i001ajax',
			 type: 'POST',
			 /* send the csrf-token and the input to the controller */
			 data: {
				 _token: CSRF_TOKEN,
				 mergedata: mergearray,
				 tabledata: tablearray,
				 formatdata: JSON.stringify(formatArrayTemp),
				 // databasedata: JSON.stringify(databasearray),
				 // positiondata: JSON.stringify(positionarray),
			 },
			 dataType: 'JSON',
			 /* remind that 'data' is the response of the AjaxController */
			 beforeSend: function() {
				 $('#loading').show();
			 },
			 complete: function() {
				 $('#loading').hide();
			 },
			 success: function(data) {
				 alert("保存されました。");
			 },
			 error: function(e) {
				 alert("保存できません。");
			 }
		 });
	 })
	 setCollapse();
	 //console.log((formatArrayTemp));
	 $('tr').on('hidden.bs.collapse', function(e) {
		 $('#hot' + e.currentTarget.id).find('.wtHider').css('height', '22px');
	 })
	 $('tr').on('show.bs.collapse', function(e) {
		 $('#hot' + e.currentTarget.id).find('.wtHider').css('height', $('#hot' + e.currentTarget.id).find('.wtSpreader').height() + 21);
	 })
	 $(window).resize(function() {
		 setCollapse();
	 });
	 $('#add-btn').on('click', function() {
		 autoMeger(currentTable, hotArray[currentTable].countRows());
		 tablearray[currentTable].push(new Array(tablearray[currentTable].length));
		 hotArray[currentTable].updateSettings({
			 data: tablearray[currentTable],
			 mergeCells: mergearray[currentTable],
			 cell: formatArray[currentTable],
		 });
	 })
 });

 function checkArrayValue(arraytocheck) {
	 if (arraytocheck != 'none') {
		 return JSON.parse(arraytocheck);
	 } else {
		 return new Array();
	 }
 }

 function make2DArray(row, col) {
	 var array2D = new Array();
	 for (var i = 0; i < row; i++) {
		 array2D.push(new Array(col));
	 }
	 return array2D;
 }

 function setDatabasePosition(start_row, start_col) {
	 var temp = {
		 'start_row': start_row,
		 'start_col': start_col,
	 };
	 positionarray.push(temp);
 }

 function convertInt() {
	 for (var i = 0; i < mergearray.length; i++) {
		 var temp = mergearray[i];
		 for (var j = 0; j < temp.length; j++) {
			 temp[j]['row'] = Number(temp[j]['row']);
			 temp[j]['col'] = Number(temp[j]['col']);
			 temp[j]['colspan'] = Number(temp[j]['colspan']);
			 temp[j]['rowspan'] = Number(temp[j]['rowspan']);
		 }
		 mergearray[i] = temp;
	 }
 }

 function autoMeger(currentTable, hotcolumn) {
	 var temp = mergearray[this.currentTable];
	 for (var j = 0; j < temp.length; j++) {
		 if (temp[j]['row'] == hotcolumn - 1) {
			 var mergeTemp = {
				 row: 0,
				 col: 0,
				 rowspan: 0,
				 colspan: 0
			 };
			 mergeTemp['row'] = hotcolumn;
			 mergeTemp['col'] = temp[j]['col'];
			 mergeTemp['colspan'] = temp[j]['colspan'];
			 mergeTemp['rowspan'] = 1;
			 temp.push(mergeTemp);
		 } else
		 if ((temp[j]['row'] + temp[j]['rowspan']) == hotcolumn) {
			 var mergeTemp = {
				 row: 0,
				 col: 0,
				 rowspan: 0,
				 colspan: 0
			 };
			 mergeTemp['row'] = hotcolumn;
			 mergeTemp['col'] = temp[j]['col'];
			 mergeTemp['colspan'] = temp[j]['colspan'];
			 mergeTemp['rowspan'] = 1;
			 temp.push(mergeTemp);
		 }
	 }
	 mergearray[this.currentTable] = temp;
	 //format array for new row
	 convertFormat(formatArray);
	 //console.log(formatArray);
	 var temp = formatArray[this.currentTable];
	 for (var k = 0; k < temp.length; k++) {
		 console.log(temp.length);
		 if (temp[k]['row'] == hotcolumn - 1) {
			 var mergeTemp = {
				 row: 0,
				 col: 0,
				 renderer: normalRenderer
			 };
			 mergeTemp['row'] = hotcolumn;
			 mergeTemp['col'] = temp[k]['col'];
			 if (typeof temp[k]['renderer'] != 'undefined')
			 mergeTemp['renderer'] = temp[k]['renderer'];
			 temp.push(mergeTemp);
			 //console.log(temp);
		 }
		 //console.log(k);
	 }
	 formatArray[this.currentTable] = temp;
 }

 function convertFormat() {
	 for (var i = 0; i < formatArray.length; i++) {
		 var temp = formatArray[i];
		 for (var j = 0; j < temp.length; j++) {
		 	
		 switch (temp[j]['renderer']) {
		 	 case 0:
				 temp[j]['renderer'] = normalRenderer;
				 formatArray[i]=temp;
				 break;
			 case 1:
				 temp[j]['renderer'] = blueRenderer;
				 formatArray[i]=temp;
				 break;
			 case 2:
				 temp[j]['renderer'] = blueSkyRenderer;
				 formatArray[i]=temp;
				 break;
			 case 3:
				 temp[j]['renderer'] = yellowRenderer;
				 formatArray[i]=temp;
				 break;
			 case 4:
				 temp[j]['renderer'] = greyRenderer;
				 formatArray[i]=temp;
				 break;
			 case 5:
				 temp[j]['renderer'] = readOnlyRenderer;
				 formatArray[i]=temp;
				 break;
			 case 6:
				 temp[j]['renderer'] = checkboxRenderer;
				 formatArray[i]=temp;
				 break;
			 case 7:
				 temp[j]['renderer'] = numericRenderer;
				 formatArray[i]=temp;
				 break;
			 case 8:
				 temp[j]['renderer'] = dateRenderer;
				 formatArray[i]=temp;
				 break;
		 }

		 }
	 }

 }

 function setCollapse() {
	 for (var i = 0; i < 15; i++) {
		 if (i > 1) {
			 $gettableId = $('#hot' + i);
			 //alert(i);
			 //get first tr 
			 $gettrFirst = $gettableId.find('table tbody tr:first');
			 //add data-toggle and data-target in first tr 
			 $gettrFirst.attr("data-toggle", "collapse");
			 $gettrFirst.attr("data-target", ".collapseTB" + i);
			 //get all tr
			 $t = $gettableId.find('table tbody tr');
			 for (var j = 1; j < $t.length; j++) {
				 $t.eq(j).addClass('collapse in collapseTB' + i);
				 $t.eq(j).attr('id', i);
			 }
		 }
	 }
 }

 function covertData() {
	 for (var i = 0; i < tablearray.length; i++) {
		 var temp = tablearray[i];
		 for (j = 0; j < temp.length; j++) {
			 for (k = 0; k <= temp[j].length; k++) {
				 if (temp[j][k] === "") {
					 temp[j][k] = null;
				 }
			 }
		 }
		 tablearray[i] = temp;
	 }
 }

 function updateFormatArray(td, row, col, cellProperties,rendererid) {
	 var tableid = $(td).parents('.handsontable').last().attr('id');
	 tableid=Number(tableid.split('hot')[1]);
	 temp = formatArrayTemp[tableid];
	 //alert(cellProperties.renderer);
	 //return;
	 var formatTemp = {
				 row: 0,
				 col: 0,
				 renderer: 0
			 };
	 formatTemp['row'] = row;
	 formatTemp['col'] = col;
	 formatTemp['renderer'] = rendererid;
	 for(var i=0;i<temp.length;i++){
	 	if(temp[i]['row']==row&&temp[i]['col']==col){
	 		temp[i]=formatTemp;
	 		formatArrayTemp[tableid]=temp;
	 		return;
	 	}
	 }
	 temp.push(formatTemp);
	 formatArrayTemp[tableid]=temp;
	 return;
 }