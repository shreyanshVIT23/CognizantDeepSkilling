package exercise1;

public interface ExternalApi {
    default String getData() {
        return "Some Data";
    };
}
