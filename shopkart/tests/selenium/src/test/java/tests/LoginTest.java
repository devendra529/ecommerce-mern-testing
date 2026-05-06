package tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pages.LoginPage;

public class LoginTest {

    private WebDriver driver;
    private LoginPage loginPage;

    @BeforeMethod
    public void setUp() {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");

        driver = new ChromeDriver(options);
        driver.manage().window().maximize();

        loginPage = new LoginPage(driver);
    }

    @Test(description = "Valid login should redirect to products page")
    public void testValidLogin() {
        loginPage.open();
        loginPage.login("testuser@shopkart.com", "test123");

        Assert.assertTrue(loginPage.isOnProductsPage(),
            "After valid login, user should be on products page. Current URL: " + loginPage.getCurrentUrl());
    }

    @Test(description = "Wrong password should show error message")
    public void testWrongPassword() {
        loginPage.open();
        loginPage.login("testuser@shopkart.com", "wrongpassword");

        String error = loginPage.getErrorMessage();
        Assert.assertFalse(error.isEmpty(),
            "Error message should be shown for wrong password");
    }

    @Test(description = "Empty email should not submit")
    public void testEmptyEmail() {
        loginPage.open();
        loginPage.enterPassword("test123");
        loginPage.clickLogin();

        Assert.assertTrue(loginPage.getCurrentUrl().contains("/login"),
            "Should stay on login page when email is empty");
    }

    @Test(description = "Login page should load correctly")
    public void testLoginPageLoads() {
        loginPage.open();
        Assert.assertTrue(loginPage.getCurrentUrl().contains("/login"),
            "Login page should be at /login URL");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
