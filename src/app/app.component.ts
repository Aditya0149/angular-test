import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
let addresses = [{
  address:'Gurjaro Ki Talai, Muhana maod, Muhana Rd, Sanganer, Jaipur, Rajasthan 302029, India',
  lat:26.7975371,
  lng:75.76803799999993
},{
  address:'Gurjaro Ki Talai, Muhana maod, Muhana Rd, Sanganer, Jaipur, Rajasthan 302029, India',
  lat:26.7975371,
  lng:75.76803799999993
}];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-test2';
  public addresses = addresses;
  public showInput = false;
  showAddressModal = false;
  showMap = false;
  mapAddress;
  autocompleteInput:string;
  place:google.maps.places.PlaceResult;
  autocomplete:any;
  @ViewChild('newAddress')
  public searchElementRef: ElementRef;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }
  ngOnInit() {
      let data = JSON.parse(localStorage.getItem('addresses'));
      if(!data) localStorage.setItem('addresses', JSON.stringify(addresses));
      else this.addresses = data;
      this.mapsAPILoader.load().then(() => {
        this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["address"]
        });
        
        this.autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            this.place = this.autocomplete.getPlace();
  
            //verify result
            if (this.place.geometry === undefined || this.place.geometry === null) {
              console.log("geo nul");
              return;
            }
          });
        });
      });      
  }
  ngAfterViewInit() {
    //this.getPlaceAutocomplete();
  }
  public selectChange(val:any) {
    console.log("val ",val);
    this.showInput = !this.showInput;
  }
  public inputChange(val:any) {
    console.log("search val ",val);
    if(!val) this.addresses = addresses;
    this.addresses = this.addresses.filter( ad => { if (ad.address.indexOf(val) > -1) return ad } );
  }
  public optionClicked(option) {
    console.log(option);
    this.mapAddress = option;
    this.showMap = true;
    this.showInput = false;
  }
  public addAddress(add) {
    //this.place = this.autocomplete.getPlace();
    if(!this.place.geometry) {
      alert("place api error");
      return;
    }
    let newAddress = {
      address:this.place['formatted_address'],
      lat:this.place.geometry.location.lat(),
      lng:this.place.geometry.location.lng()
    }
    this.addresses.push(newAddress);
    this.showAddressModal = true;
    this.showMap = true;
    this.showInput = false;
    this.mapAddress = newAddress;
  }
  ngOnDestroy(){
    localStorage.setItem('addresses', JSON.stringify(this.addresses));
  }
}
