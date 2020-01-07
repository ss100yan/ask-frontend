import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Tag } from '../models/Tag';
import { TagService } from './tags.service';
import { asyncData } from '../../test';

describe('TagsService', () => {
    const tagDummyData: Tag[] = [
        {
            id: 1,
            name: 'JavaScript'
        },
        {
            id: 2,
            name: 'SQL'
        },
        {
            id: 3,
            name: 'Java'
        },
        {
            id: 4,
            name: 'HTML'
        },
        {
            id: 5,
            name: 'Angular'
        },
        {
            id: 6,
            name: 'Bootstrap'
        },
        {
            id: 7,
            name: 'React'
        },
        {
            id: 8,
            name: 'Docker'
        },
        {
            id: 9,
            name: 'Spring'
        },
        {
            id: 10,
            name: 'PostgreSQL'
        }];

    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
    }));

    let httpClientSpy: { get: jasmine.Spy, put: jasmine.Spy };
    let tagService: TagService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);
        tagService = new TagService(httpClientSpy as any);
    });

    it('should be created', () => {
        const service: TagService = TestBed.get(TagService);
        expect(service).toBeTruthy();
    });

    it('should get all tags (HttpClient called once)', () => {
        httpClientSpy.get.and.returnValue(asyncData(tagDummyData));
        tagService.getTags().subscribe(
            response => expect(response).toEqual(tagDummyData, 'expected response'),
            fail
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    /*
    it('should get all tags from a expert (HttpClient called once)', () => {
        httpClientSpy.get.and.returnValue(asyncData(tagDummyData));
        tagService.getTags().subscribe(
            response => expect(response).toEqual(tagDummyData, 'expected response'),
            fail
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });
    */
});

