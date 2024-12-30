import {HttpClient} from '@angular/common/http';
import {api} from '../assets/api';
import {CompassGameDto, InfoCompassGameDto} from '../app/dtos/compass-game';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

const baseUri = api.backendUrl + '/compassGame';
@Injectable({
  providedIn: 'root'
})
export class CompassGameService{
  constructor(private http: HttpClient) {}

  findOneById(id: number): Observable<CompassGameDto> {
    console.log('Fetching compass game with baseUri: ', baseUri);
    return this.http.get<CompassGameDto>(`${baseUri}/${id}`);
  }

  findAll(): Observable<InfoCompassGameDto[]> {
    console.log('Fetching compass game with baseUri: ', baseUri);
    return this.http.get<InfoCompassGameDto[]>(baseUri);
  }

  create(compassGameDto: CompassGameDto): Observable<void> {
    return this.http.post<void>(baseUri, compassGameDto);
  }
}
