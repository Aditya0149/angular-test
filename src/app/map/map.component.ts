import { Component, OnInit, Input, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input("address") addressDetail;
  zoom: number;
  address: string;
  private geoCoder;
 
 
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }
 
 
  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.zoom = 8;
      this.geoCoder = new google.maps.Geocoder;
      
    });
  }
 
 
 
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.addressDetail.latitude = $event.coords.lat;
    this.addressDetail.longitude = $event.coords.lng;
    this.getAddress(this.addressDetail.latitude, this.addressDetail.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
 
    });
  }


}
