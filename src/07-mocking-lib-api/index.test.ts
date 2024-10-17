import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const mockResponseData = { id: 1, title: 'Test title' };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('should create instance with provided base URL', async () => {
    const relativePath = '/posts/1';

    const axiosClientMock = {
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    };

    (axios.create as jest.Mock).mockReturnValue(axiosClientMock);

    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided URL', async () => {
    const relativePath = '/posts/1';

    const axiosClientMock = {
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    };

    (axios.create as jest.Mock).mockReturnValue(axiosClientMock);

    await throttledGetDataFromApi(relativePath);

    expect(axiosClientMock.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/posts/1';

    const axiosClientMock = {
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    };

    (axios.create as jest.Mock).mockReturnValue(axiosClientMock);

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockResponseData);
  });

  test('should throttle requests', async () => {
    const relativePath = '/posts/1';
    const axiosClientMock = {
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    };

    (axios.create as jest.Mock).mockReturnValue(axiosClientMock);

    await throttledGetDataFromApi(relativePath);
    expect(axiosClientMock.get).toHaveBeenCalledTimes(1);

    throttledGetDataFromApi(relativePath);
    expect(axiosClientMock.get).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(THROTTLE_TIME);

    await throttledGetDataFromApi(relativePath);
    expect(axiosClientMock.get).toHaveBeenCalledTimes(2);
  });
});
