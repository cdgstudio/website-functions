import { describe, expect, it } from '@jest/globals';

describe('/api/code/highlight', () => {
  it('should highlight the code', async () => {
    const query = new URLSearchParams({
      language: 'typescript',
    });

    const response = await fetch(new URL(`http://localhost:8888/api/code/format-and-highlight?${query}`), {
      method: 'POST',
      body: `it('should not call "loadItems" action when the status is LOADED', async () => {
        const { actions$, injector, mockToDoApi, mockStore } 
        = createContext();
      
        mockStore.setState({ task: { 
            status: 'LOADED', tasks: [] } });
      
        await runInInjectionContext(injector, async () => 
        
        {
          const effect = TasksEffects.loadTasks();
      
          const resultPromise = firstValueFrom(effect, { defaultValue: 'END' });
          actions$.next(ToDoActions.loadTasks)
          actions$.complete();
      
    expect(await resultPromise).toEqual('END')
          expect(mockToDoApi.getTasks).toHaveBeenCalledTimes(0)
        });
      });`,
    });

    const text = await response.text();

    expect(text).toMatchSnapshot();
  });

  it('should return 400 when code is invalid', async () => {
    const query = new URLSearchParams({
      language: 'typescript',
    });

    const response = await fetch(new URL(`http://localhost:8888/api/code/format-and-highlight?${query}`), {
      method: 'POST',
      body: `error class A{
        constructor()  {  }
        }`,
    });

    expect(response.status).toEqual(400);
  });
});
