import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('usersCol') usersCol: any; // Referencia al elemento ion-col
  data: any;
  getStoredKeys: any;
  constructor(
    private storage: Storage
    
  ) {
    
  }
  ngOnInit(): void {
    this.storage.create();
    this.data = {};

    this.initializeData();
    
    this.allStoredKeys();   
    
  }

  initializeData() {
    this.storage.get('name').then((name) => {
      this.data.name = name || '';
    });

    this.storage.get('phone').then((phone) => {
      this.data.phone = phone || '';
    });

    this.storage.get('users').then((users) => {
      this.data.users = users || [];
    });
  }


  // set a key/value
  setValue(key: string, value: any) {
    this.storage.set(key, value).then((res) => {
      console.log('set' + key + ' ', res);
      // fetch key-value stored in key
      this.getKeyValue(key);
      this.allStoredKeys();
    }).catch((error) => {
      console.log('Error ' + key + ' ', error);
    });
  }
  // fetch a key/value
  getKeyValue(key: string) {
    this.storage.get(key).then((res) => {
      this.data[key] = "";
      this.data[key] = res;
    }).catch((err) => {
      console.log('Error ' + key + '', err);
    });
  }
  // Remove key/value
  deleteKey(key: string) {
    this.storage.remove(key).then(() => {
      alert('Deleted ' + key);
      this.data[key] = "";

      if (key === 'users') {
        // Eliminar todo el array data.users
        this.data.users = [];
      }      

      this.allStoredKeys();
    }).catch((err) => {
      alert(err);
    });
  }
  // Get all stored key/value
  allStoredKeys() {
    this.storage.keys().then((res) => {
      this.getStoredKeys = res;
    });
  }

  insertValues() {

    // Set String Value
    this.setValue("name", "Universidad del Cauca");
    
    // Set Integer Value
    this.setValue("phone", 8209900);
    
    let userObj = [
      {
        name: "Camilo Otero",
        username: "juanoterov",
        email: "juant@unicauca.edu.co"
      },
      {
        name: "Melissa Velasco",
        username: "MeliVel",
        email: "melissa@unicauca.edu.co"
      }      
    ];
    // Set object val
    this.setValue("users", userObj);
    this.allStoredKeys();
    
  }
}