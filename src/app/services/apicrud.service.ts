import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from 'src/interfaces/users';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  constructor(private httpclient: HttpClient) { }

  getUser(): Observable<Users> {
    const username = sessionStorage.getItem('username');
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios?username=${username}`).pipe(
      map(users => users[0]) // Retorna solo el primer usuario
    );
  }

  putUser(user:any): Observable<Users> {
    return this.httpclient.put<Users>(`${environment.apiUrl}/usuarios/${user.id}`,user);
  }

}
