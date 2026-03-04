import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListItem } from './post-list-item';

describe('PostListItem', () => {
  let component: PostListItem;
  let fixture: ComponentFixture<PostListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostListItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
