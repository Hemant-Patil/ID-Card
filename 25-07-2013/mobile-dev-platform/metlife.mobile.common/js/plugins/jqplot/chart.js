//var chartFontStyle = "font12px";
var sliceColor = ['#F06439', '#3E94CC'];
define([], function() {
	var jqplot = {
			// classAmount : "",
			donutChart : function(divId, data, label){
				var dataSeries = new Array() ;
				for(var i=0; i<label[0].length; i++){
					dataSeries[i] = new Array();
					/*dataSeries[i][0] = '<label class=' + chartFontStyle + '>' + label[0][i] + '</label>';*/
					dataSeries[i][0] = label[0][i];
					dataSeries[i][1] = data[0][i];
				}
				/*
				 * var dataSeries = [['<label class=' + classLabel + '>' +
				 * label[0][0] + '$' + dataLabel[0][0].toFixed(2) + '</label>',dataLabel[0][0]],
				 * ['Benefit Paid:<br/>$' +
				 * dataLabel[0][1].toFixed(2),dataLabel[0][1]]];
				 */
				$.jqplot(divId, [dataSeries], {
					  grid: {
						    background: 'transparent',     
						    borderWidth: 0, 
						    renderer: $.jqplot.CanvasGridRenderer,
						    shadow: false
						},
					  seriesDefaults: {
				      // make this a donut chart.
				      renderer:$.jqplot.DonutRenderer,
				      rendererOptions:{
				        sliceMargin: 3,
				        shadow: false, 
				        showDataLabels: false,
				        dataLabels: 'label',
				        innerDiameter : 75,
				        startAngle: -90,
				        highlightMouseOver: false,
				        dataLabelPositionFactor : 2.3
				      }
				    },
				    legend: {
				        // This renderer is needed for advance legends.
				        //renderer: jQuery.jqplot.EnhancedLegendRenderer,
				        show: true, 
				        location: 'ne', 
				        placement: 'outside',
				        //showSwatch: true,
				        border: 'none'
				        	//marginLeft : '100px'
				        //xoffset: 100,
				        // Breaks the ledgend into horizontal.
				        /*rendererOptions: {
				        	 numberRows: 2,
				          numberColumns: 3
				        },*/
				        //seriesToggle: true
				    },
				    seriesColors :sliceColor
				  });
			}	
	};
	return jqplot;
});
/*
 * function drawGraph(divId, dataLabel){ }
 */