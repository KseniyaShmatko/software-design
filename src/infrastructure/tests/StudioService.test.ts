import { StudioService } from "../../core/services/StudioServices/StudioServices";
import { StudioRepository } from "../../core/repositories/StudioRepository/IStudioRepository";
import { AddStudioDto, UpdateStudioDto } from "../../core/repositories/StudioRepository/StudioDto";
import { Studio } from "../../core/models/Studio/Studio";

const mockStudioRepository: jest.Mocked<StudioRepository> = {
    getById: jest.fn(),
    getByName: jest.fn(),
    getAll: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const studioService = new StudioService(mockStudioRepository);

describe('StudioService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get studio by id', async () => {
        const expectedStudio: Studio = {
            id: 1,
            name: 'Test Studio',
            founder: 'Founder',
            country: 'Country',
            foundation: new Date(),
            photo: 'photo.jpg',
        };

        mockStudioRepository.getById.mockReturnValueOnce(expectedStudio);

        const result = await studioService.getById(1);

        expect(result).toEqual(expectedStudio);
        expect(mockStudioRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should get studio by name', async () => {
        const expectedStudio: Studio = {
            id: 1,
            name: 'Test Studio',
            founder: 'Founder',
            country: 'Country',
            foundation: new Date(),
            photo: 'photo.jpg',
        };

        mockStudioRepository.getByName.mockReturnValueOnce(expectedStudio);

        const result = await studioService.getByName('Test Studio');

        expect(result).toEqual(expectedStudio);
        expect(mockStudioRepository.getByName).toHaveBeenCalledWith('Test Studio');
    });

    it('should get all studios', async () => {
        const expectedStudios: Studio[] = [
            {
                id: 1,
                name: 'Test Studio 1',
                founder: 'Founder 1',
                country: 'Country 1',
                foundation: new Date(),
                photo: 'photo1.jpg',
            },
            {
                id: 2,
                name: 'Test Studio 2',
                founder: 'Founder 2',
                country: 'Country 2',
                foundation: new Date(),
                photo: 'photo2.jpg',
            },
        ];

        mockStudioRepository.getAll.mockReturnValueOnce(expectedStudios);

        const result = await studioService.getAll();

        expect(result).toEqual(expectedStudios);
        expect(mockStudioRepository.getAll).toHaveBeenCalled();
    });


    it('should add a new studio', async () => {
        const studioDto: AddStudioDto = {
            name: 'New Studio',
            founder: 'Founder',
            country: 'Country',
            foundation: new Date(),
            photo: 'photo.jpg',
        };

        const expectedStudio: Studio = {
            id: 1,
            ...studioDto,
        };

        mockStudioRepository.add.mockReturnValueOnce(expectedStudio);

        const result = await studioService.add(studioDto);

        expect(result).toEqual(expectedStudio);
        expect(mockStudioRepository.add).toHaveBeenCalledWith(studioDto);
    });

    it('should update an existing studio', async () => {
        const studioDto: UpdateStudioDto = {
            name: 'Updated Studio',
            founder: 'Updated Founder',
            country: 'Updated Country',
            foundation: new Date(),
            photo: 'updated_photo.jpg',
        };
    
        const expectedStudio: Studio = {
            id: 1,
            ...studioDto,
        };

        mockStudioRepository.update.mockReturnValueOnce(expectedStudio);
    
        const result = await studioService.update(studioDto);
    
        expect(result).toEqual(expectedStudio);
        expect(mockStudioRepository.update).toHaveBeenCalledWith(studioDto);
    });

    it('should delete a studio by id', async () => {
        mockStudioRepository.delete.mockReturnValueOnce(undefined);

        await studioService.delete(1);

        expect(mockStudioRepository.delete).toHaveBeenCalledWith(1);
    });
});

describe('StudioService Errors', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it('should handle error when getting studio by id', async () => {
        const errorMessage = 'Error getting studio by id';
        mockStudioRepository.getById.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await studioService.getById(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting studio by id: Error: ${errorMessage}`);
    });

    it('should handle error when getting studio by name', async () => {
        const errorMessage = 'Error getting studio by name';
        mockStudioRepository.getByName.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await studioService.getByName('Test Studio');

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting studio by name: Error: ${errorMessage}`);
    });

    it('should handle error when getting all studios', async () => {
        const errorMessage = 'Error getting all studios';
        mockStudioRepository.getAll.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await studioService.getAll();

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting all studios: Error: ${errorMessage}`);
    });

    it('should handle error when adding a new studio', async () => {
        const errorMessage = 'Error adding studio';
        mockStudioRepository.add.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await studioService.add({ name: 'New Studio', founder: 'Founder', country: 'Country', foundation: new Date(), photo: 'photo.jpg' });

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error adding studio: Error: ${errorMessage}`);
    });

    it('should handle error when updating an existing studio', async () => {
        const errorMessage = 'Error updating studio';
        mockStudioRepository.update.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await studioService.update({ name: 'Updated Studio', founder: 'Updated Founder', country: 'Updated Country', foundation: new Date(), photo: 'updated_photo.jpg' });

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error updating studio: Error: ${errorMessage}`);
    });

    it('should handle error when deleting a studio by id', async () => {
        const errorMessage = 'Error deleting studio';
        mockStudioRepository.delete.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await studioService.delete(1);

        expect(console.error).toHaveBeenCalledWith(`Error deleting studio: Error: ${errorMessage}`);
    });
});
