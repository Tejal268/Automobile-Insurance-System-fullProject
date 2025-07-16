import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-officerhome',
  templateUrl: './officerhome.html',
  styleUrl: './officerhome.css'
})
export class Officerhome implements OnInit {
  officerName: string = 'Officer'; // Default value

  ngOnInit() {
    // Example: If you store the officer's name in localStorage
    const storedName = localStorage.getItem('officerName');
    if (storedName) {
      this.officerName = storedName;
    }
    // Or fetch from a service if you have one
  }
}
