import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    MatIconModule,
    AppComponent,
    FormsModule,
    CommonModule,
    AppRoutingModule,
  ],
  providers: [provideHttpClient(), CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
