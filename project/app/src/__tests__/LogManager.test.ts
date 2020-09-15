import { debug, disableLog, enableLog, error, get } from '../LogManager';

describe('LogManager', () => {
  test('should be empty at start', () => {
    expect(get().length).toBe(0);
  });
  test('log debug', () => {
    debug('This is a debug message')
    expect(get().length).toBe(1);
    expect(get()[0].level).toBe('debug');
    expect(get()[0].message).toBe('This is a debug message');
  });
  test('log error', () => {
    error("This is an error")
    expect(get().length).toBe(2);
    expect(get()[1].level).toBe('error');
    expect(get()[1].message).toBe('This is an error');
  });
  test('disabled logs should not log', () => {
    disableLog();
    error("This is an error")
    expect(get().length).toBe(2);
  });
  test('(re) enabled logs should log', () => {
    enableLog();
    error("This is an error")
    expect(get().length).toBe(3);
  });
  test('Logs should be truncated after 100 messages', () => {
    expect(get().length).toBe(3);
    expect(get()[0].level).toBe('debug');
    for (let i=0;i<110;i++) {
      error("This is an error")
    }
    expect(get().length).toBe(100);
    expect(get()[0].level).toBe('error');
  });
});
