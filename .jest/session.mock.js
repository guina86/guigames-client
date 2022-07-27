const useSession = jest.spyOn(require('next-auth/client'), 'useSession')
const session = { jwt: '123', user: { email: 'any@email.com' } }
useSession.mockImplementation(() => [session])