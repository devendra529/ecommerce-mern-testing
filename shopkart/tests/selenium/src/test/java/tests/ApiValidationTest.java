package tests;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class ApiValidationTest {

    private static final String BASE_URL = "http://localhost:5000/api";
    private String authToken;

    @BeforeClass
    public void setup() {
        RestAssured.baseURI = BASE_URL;
    }

    @Test(priority = 1, description = "Register should return 201 with token")
    public void testRegister() {
        String body = "{ \"name\": \"API Tester\", \"email\": \"apitester" + System.currentTimeMillis() + "@test.com\", \"password\": \"test123\" }";

        Response response = given()
            .contentType("application/json")
            .body(body)
            .when()
            .post("/auth/register");

        Assert.assertEquals(response.statusCode(), 201);
        authToken = response.jsonPath().getString("token");
        Assert.assertNotNull(authToken, "Token should not be null");

        String name = response.jsonPath().getString("name");
        Assert.assertEquals(name, "API Tester");

        String password = response.jsonPath().getString("password");
        Assert.assertNull(password, "Password should NOT be returned in response");
    }

    @Test(priority = 2, description = "Register with duplicate email should return 400")
    public void testDuplicateEmail() {
        String body = "{ \"name\": \"Test\", \"email\": \"testuser@shopkart.com\", \"password\": \"test123\" }";

        given()
            .contentType("application/json")
            .body(body)
            .when()
            .post("/auth/register")
            .then()
            .statusCode(400)
            .body("message", notNullValue());
    }

    @Test(priority = 3, description = "Get all products should return array with valid fields")
    public void testGetProducts() {
        given()
            .when()
            .get("/products")
            .then()
            .statusCode(200)
            .body("$", instanceOf(java.util.List.class))
            .body("[0].name", notNullValue())
            .body("[0].price", greaterThan(0.0f))
            .body("[0].category", notNullValue());
    }

    @Test(priority = 4, description = "Validate product price is always positive")
    public void testProductPriceValidation() {
        Response response = given()
            .when()
            .get("/products");

        Assert.assertEquals(response.statusCode(), 200);

        int productCount = response.jsonPath().getList("$").size();
        for (int i = 0; i < productCount; i++) {
            float price = response.jsonPath().getFloat("[" + i + "].price");
            Assert.assertTrue(price > 0, "Product at index " + i + " has invalid price: " + price);
        }
    }

    @Test(priority = 5, description = "Cart requires authentication token")
    public void testCartRequiresAuth() {
        given()
            .when()
            .get("/cart")
            .then()
            .statusCode(401)
            .body("message", containsString("Not authorized"));
    }
}
