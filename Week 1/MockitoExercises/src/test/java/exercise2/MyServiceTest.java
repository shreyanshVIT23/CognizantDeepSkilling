package exercise2;

import exercise1.ExternalApi;
import exercise1.MyService;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

public class MyServiceTest {
    @Test
    void testVerifyInteraction() {

        ExternalApi mockApi = mock(ExternalApi.class);

        MyService service =
                new MyService(mockApi);

        service.fetchData();

        verify(mockApi).getData();
    }
}
