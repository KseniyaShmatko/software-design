import { ParticipantService } from "../../core/services/ParticipantServices/ParticipantServices";
import { ParticipantRepository } from "../../core/repositories/ParticipantRepository/ParticipantRepository";
import { AddParticipantDto, UpdateParticipantDto } from "../../core/repositories/ParticipantRepository/ParticipantDto";
import { Participant } from "../../core/models/Participant/Participant";

const mockParticipantRepository: jest.Mocked<ParticipantRepository> = {
    getById: jest.fn(),
    getByNameSurname: jest.fn(),
    getAll: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const participantService = new ParticipantService(mockParticipantRepository);

describe('ParticipantService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get participant by id', async () => {
        const expectedParticipant: Participant = {
            id: 1,
            name: 'John',
            surname: 'Doe',
            birth: new Date('1990-01-01'),
            death: new Date('2020-01-01'),
            photo: 'john_doe.jpg',
        };

        mockParticipantRepository.getById.mockReturnValueOnce(expectedParticipant);

        const result = await participantService.getById(1);

        expect(result).toEqual(expectedParticipant);
        expect(mockParticipantRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should get participant by name and surname', async () => {
        const expectedParticipant: Participant = {
            id: 1,
            name: 'John',
            surname: 'Doe',
            birth: new Date('1990-01-01'),
            death: null,
            photo: 'john_doe.jpg',
        };

        mockParticipantRepository.getByNameSurname.mockReturnValueOnce(expectedParticipant);

        const result = await participantService.getByNameSurname('John', 'Doe');

        expect(result).toEqual(expectedParticipant);
        expect(mockParticipantRepository.getByNameSurname).toHaveBeenCalledWith('John', 'Doe');
    });

    it('should get all participants', async () => {
        const expectedParticipants: Participant[] = [
            {
                id: 1,
                name: 'John',
                surname: 'Doe',
                birth: new Date('1990-01-01'),
                death: new Date('2020-01-01'),
                photo: 'john_doe.jpg',
            },
            {
                id: 2,
                name: 'Jane',
                surname: 'Smith',
                birth: new Date('1980-01-01'),
                death: new Date('2022-01-01'),
                photo: 'jane_smith.jpg',
            },
        ];

        mockParticipantRepository.getAll.mockReturnValueOnce(expectedParticipants);

        const result = await participantService.getAll();

        expect(result).toEqual(expectedParticipants);
        expect(mockParticipantRepository.getAll).toHaveBeenCalled();
    });

    it('should add a new participant', async () => {
        const participantDto: AddParticipantDto = {
            name: 'John',
            surname: 'Doe',
            birth: new Date('1990-01-01'),
            death: new Date('2020-01-01'),
            photo: 'john_doe.jpg',
        };

        const expectedParticipant: Participant = {
            id: 1,
            ...participantDto,
        };

        mockParticipantRepository.add.mockReturnValueOnce(expectedParticipant);

        const result = await participantService.add(participantDto);

        expect(result).toEqual(expectedParticipant);
        expect(mockParticipantRepository.add).toHaveBeenCalledWith(participantDto);
    });

    it('should update an existing participant', async () => {
        const participantDto: UpdateParticipantDto = {
            name: 'John',
            surname: 'Doe',
            birth: new Date('1990-01-01'),
            death: new Date('2021-01-01'),
            photo: 'updated_john_doe.jpg',
        };
    
        const expectedParticipant: Participant = {
            id: 1,
            ...participantDto,
        };

        mockParticipantRepository.update.mockReturnValueOnce(expectedParticipant);
    
        const result = await participantService.update(participantDto);
    
        expect(result).toEqual(expectedParticipant);
        expect(mockParticipantRepository.update).toHaveBeenCalledWith(participantDto);
    });

    it('should delete a participant by id', async () => {
        mockParticipantRepository.delete.mockReturnValueOnce(undefined);

        await participantService.delete(1);

        expect(mockParticipantRepository.delete).toHaveBeenCalledWith(1);
    });
});

describe('ParticipantService Errors', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it('should handle error when getting participant by id', async () => {
        const errorMessage = 'Error getting participant by id';
        mockParticipantRepository.getById.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await participantService.getById(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting participant by id: Error: ${errorMessage}`);
    });

    it('should handle error when getting participant by name and surname', async () => {
        const errorMessage = 'Error getting participant by name and surname';
        mockParticipantRepository.getByNameSurname.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await participantService.getByNameSurname('John', 'Doe');

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting participant by name and surname: Error: ${errorMessage}`);
    });

    it('should handle error when getting all participants', async () => {
        const errorMessage = 'Error getting all participants';
        mockParticipantRepository.getAll.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await participantService.getAll();

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting all participants: Error: ${errorMessage}`);
    });

    it('should handle error when adding a new participant', async () => {
        const errorMessage = 'Error adding participant';
        mockParticipantRepository.add.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await participantService.add({
            name: 'John',
            surname: 'Doe',
            birth: new Date('1990-01-01'),
            death: new Date('2020-01-01'),
            photo: 'john_doe.jpg',
        });

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error adding participant: Error: ${errorMessage}`);
    });

    it('should handle error when updating an existing participant', async () => {
        const errorMessage = 'Error updating participant';
        mockParticipantRepository.update.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await participantService.update({
            name: 'John',
            surname: 'Doe',
            birth: new Date('1990-01-01'),
            death: new Date('2021-01-01'),
            photo: 'updated_john_doe.jpg',
        });

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error updating participant: Error: ${errorMessage}`);
    });

    it('should handle error when deleting a participant by id', async () => {
        const errorMessage = 'Error deleting participant';
        mockParticipantRepository.delete.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await participantService.delete(1);

        expect(console.error).toHaveBeenCalledWith(`Error deleting participant: Error: ${errorMessage}`);
    });
});