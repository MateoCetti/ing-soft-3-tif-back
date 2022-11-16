import app from '../app'
import request from 'supertest'

test('Test pokemon endpoint', async () => {
    const res = await request(app).get("/pokemon/?name=Charizard").send();
    expect(res.status).toBe(200);
    const data = JSON.parse(res.text);
    expect(data["name"]).toBe("Charizard");
});
