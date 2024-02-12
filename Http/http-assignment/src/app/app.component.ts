import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Post } from './models/post';
import { PostsService } from './services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, HttpClientModule],
  providers: [PostsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'http-assignment';

  loadedPosts: Post[] = [];
  isFetching = false;
  error?: any = null;
  private errorSub?: Subscription;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.errorSub = this.postService.error.subscribe( e => {
      this.error = e;
    });

    this.fetchPosts();
  }

  ngOnDestroy(): void {
    this.errorSub?.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);
    
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts()
      .subscribe({ 
        next:
          (posts) => {
            console.log(posts);
            this.loadedPosts = posts;
            this.isFetching = false;
          },
        error: e => { 
          this.isFetching = false;
          console.log(e);
          this.error = e.message;
        }
      });
  }

  onClearPosts() {
    this.postService.deleteAllPosts().subscribe( () => {
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.error = null;
  }
}
