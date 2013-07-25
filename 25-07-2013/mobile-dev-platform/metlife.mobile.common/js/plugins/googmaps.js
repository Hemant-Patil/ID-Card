define(['infobox'], function() {
	// Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
	"use strict";

	var Map = {
		markers: [],
		map: null,
		bounds: null,
		infobox: null,
		init: function(canvas, lat, lng, currentloc, onDomReady) {
			var self = this;
			
			var loc = new google.maps.LatLng(lat, lng);
			this.bounds = new google.maps.LatLngBounds();
			var options = {
				center: loc,
				zoom: 3,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				panControl: false,
				zoomControl: false,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				overviewMapControl: false
			};

			this.map = new google.maps.Map(canvas, options);
			if (currentloc) {
				var marker = new google.maps.Marker({
					map: this.map,
					animation: null,
					position: loc,
					optimized: false,
					zIndex: 999,
					icon: new google.maps.MarkerImage("data:image/png;base64,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", null, null, null, new google.maps.Size(21, 23))
				});
			}

			var opts = {
				content: '',
				boxClass: 'mapinfobox',
				disableAutoPan: true,
				pixelOffset: new google.maps.Size(-132, -107),
				position: loc,
				closeBoxURL: '',
				isHidden: false,
				pane: 'floatPane'
			};
			
			self.infobox = new InfoBox(opts);
			self.infobox.hide();
      
			google.maps.event.addListener(self.map, 'click', function() {
				self.infobox.hide();
			});
			
			google.maps.event.addListener(self.infobox, 'domready', onDomReady);

		},
		addMarker: function(title, lat, lng, info) {
			var self = this;
			var tester = 'tester';
			var latlng = new google.maps.LatLng(lat, lng);
			this.bounds.extend(latlng);
			var marker = new google.maps.Marker({
				map: this.map,
				//animation: google.maps.Animation.DROP,
				position: latlng,
				title: title,
				optimized: false,
				zIndex: 999,
				icon: new google.maps.MarkerImage("data:image/png;base64,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", null, null, null, new google.maps.Size(32, 39))
			});
			
			this.markers.push(marker);
			
			if (info) {
				google.maps.event.addListener(marker, 'click', function() {
					if (self.infobox) {
						self.infobox.setContent(info());
						self.infobox.open(self.map, marker);
						self.map.panTo(marker.position);
						self.infobox.show();
						//webtrendCommonObj.logWebMetricsOnCLickEvent(metlife.dental.webTrendJsonText.denDentistDetailText,"DENTIST_DETAIL","SELECT_LOC_FROM_MAP");
					}
				});
			}
		},
		
		clearMarkers: function() {
			var l = this.markers.length;
			while (l--) {
				this.markers[l].setMap(null);
				this.markers.pop();
			}
		},
		
		fitBounds: function() {
			this.map.fitBounds(this.bounds);
		},
		destroy: function() {
			if (this.map) {
				google.maps.event.clearInstanceListeners(this.map);
			}
			this.clearMarkers();
			
			this.markers = null;
			this.bounds = null;
			this.infobox = null;
			this.map = null;
		}
	};

	return Map;
});
