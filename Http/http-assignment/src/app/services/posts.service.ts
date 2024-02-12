import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { Subject, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {
      title: title,
      content: content
    }
    // Send Http request
    return this.http
      .post(
        'https://angularcoursedemo-11f9b-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        postData)
      .subscribe({
        next: r => console.log(r),
        error: e => this.error.next(e.message)
      });
  }

  fetchPosts() {
    return this.http.get<{[key: string]: any}>('https://angularcoursedemo-11f9b-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
    .pipe(
      map(response => {
        const postsArray: Post[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const post: Post = {...response[key], id: key}
            postsArray.push(post);
          }
        }
        return postsArray;
      }),
      catchError(errorRes => {
        // here is a place fr a generic error handling task like sending to analytics
        return throwError(() => new Error(errorRes.message));
      })
    );
  }

  deleteAllPosts() {
    return this.http.delete('https://angularcoursedemo-11f9b-default-rtdb.europe-west1.firebasedatabase.app/posts.json');
  }
}
