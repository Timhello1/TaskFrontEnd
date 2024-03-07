import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }
  register(data:any){
    console.log(data)
    return this.http.post('http://127.0.0.1:8000/api/auth/register', data);
  }
  login(data:any){
    console.log(data)
    return this.http.post('http://127.0.0.1:8000/api/auth/login', data);
  }
  read(name:any){
    return this.http.get('http://127.0.0.1:8000/api/tasks/show/'+name);
  }
  addTask(data: any){
    return this.http.post('http://127.0.0.1:8000/api/tasks', data);
  }
  // @ts-ignore
  deleteTask(id){
    return this.http.delete('http://127.0.0.1:8000/api/tasks/'+id+'/delete');
  }
  readId(id: any){
    return this.http.get('http://127.0.0.1:8000/api/tasks/'+id);
  }
  editId(id: any,data:any){
    return this.http.put('http://127.0.0.1:8000/api/tasks/'+id+'/edit',data);
  }

}
